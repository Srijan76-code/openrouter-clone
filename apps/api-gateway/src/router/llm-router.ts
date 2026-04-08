import { type AIProvider, GeminiProvider } from "../providers/gemini-provider.ts";
import type { NormalizedChatRequest } from "@repo/types";
import { modelProvider } from "@repo/config";
import { messageTransformer } from "../transform/message-transformer.ts";
import { RetryHandler, type RetryPolicy, DEFAULT_RETRY_POLICY } from "./retry-handler.ts";
import { getProviderStrategy } from "./provider-strategy.ts";
import { decide, RouterAction } from "./decision-engine.ts";
import "dotenv/config"
export class LLMRouter {
  private providers: Map<string, AIProvider>;
  private retryHandler: RetryHandler;

  constructor(retryPolicy: RetryPolicy = DEFAULT_RETRY_POLICY) {
    this.providers = new Map();
    this.providers.set("google", new GeminiProvider());

    this.retryHandler = new RetryHandler(retryPolicy);
  }

  // -------------------------
  // Error Handlers
  // -------------------------
  private returnUserError(error: any) {
    throw error;
  }

  private crashAndFixDev(error: any) {
    // send to monitoring / admin
    throw error;
  }
  
  private getApiKey(): string {
    const key = process.env.GEMINI_API_KEY || "";
    if (!key) {
      throw new Error("API Key is missing in environment variables.");
    }
    return key;
  }

  // -------------------------
  // Execution Layer (Retry Only)
  // -------------------------
  private async executeWithRetry(
    providerInstance: AIProvider,
    modelName: string,
    normalized: NormalizedChatRequest,
  ) {
    let lastError: any;

    for (let attempt = 0; attempt < this.retryHandler.maxAttempts; attempt++) {
      try {
        const apiKey = this.getApiKey();
        return await providerInstance.generateChat(
          modelName,
          normalized.messages,
          normalized,
          apiKey,
        );
      } catch (error) {
        lastError = error;

        const action = decide(error, attempt, this.retryHandler.maxAttempts);

        if (action === RouterAction.FAIL_USER) {
          this.returnUserError(error);
        }

        if (action === RouterAction.FAIL_DEV) {
          this.crashAndFixDev(error);
        }

        if (action === RouterAction.FALLBACK_PROVIDER) {
          throw error;
        }

        // RETRY
        const delay = this.retryHandler.computeDelay(attempt);
        console.log(`[Retry] ${modelName} attempt ${attempt + 1} → ${delay}ms`);

        await this.retryHandler.sleep(delay);
      }
    }

    throw lastError;
  }

  async callLlm(normalized: NormalizedChatRequest) {
    console.log(`\n[Stage 1: Routing Start] Models: ${normalized.model_slug.join(", ")}`);
    
    // MODEL FALLBACK
    for (const model of normalized.model_slug) {
      const modelName = model.split("/")[1];
      console.log(`\n[Stage 2: Model Selection] Attempting model: ${modelName}`);
      
      const modelConfig = modelName && modelProvider[modelName];

      if (!modelConfig) {
        console.log(
          `[Model Fail] ${modelName} is completely missing from config`,
        );
        console.log("[Fallback] Switching to next model... (Model Fallback)");
        continue;
      }

      const providerList = getProviderStrategy(
        modelConfig,
        normalized.provider
      );
      console.log(`[Stage 3: Provider Strategy] Selected strategy: '${normalized.provider}'. Provider list: ${providerList.map(p => p.provider).join(", ")}`);

      // PROVIDER FALLBACK
      for (const providerMeta of providerList) {
        const providerInstance = this.providers.get(providerMeta.provider);
        if (!providerInstance) continue;

        try {
          // 4. Message Transformation (if enabled)
          let messages = normalized.messages;
          if (normalized.message_transform) {
            console.log(`[Stage 4: Context Management] Checking if transformation is needed (Limit: ${modelConfig.max_tokens})`);
            messages = messageTransformer.transform(
              messages,
              modelConfig.max_tokens
            );
          }

          console.log(`[Stage 5: Execution] Calling ${providerMeta.provider} -> ${modelName}`);
          const response = await this.executeWithRetry(
            providerInstance,
            modelName,
            { ...normalized, messages } // pass the transformed messages
          );
          
          console.log(`[Stage 6: Success] Response received from ${providerMeta.provider}`);
          return response;
        } catch (error) {
          const action = decide(error, this.retryHandler.maxAttempts, this.retryHandler.maxAttempts);

          console.log(
            `[Provider Fail] ${providerMeta.provider} → ${modelName} → ${action} | Error: ${(error as any).message || error}`
          );

          if (action === RouterAction.FAIL_USER) {
            this.returnUserError(error);
          }

          if (action === RouterAction.FAIL_DEV) {
            this.crashAndFixDev(error);
          }

          console.log(
            "[Fallback] Switching to next provider... (Provider Fallback)",
          );
          // fallback to next provider
          continue;
        }
      }

      console.log(`[Model Fail] ${modelName} exhausted`);
      console.log("[Fallback] Switching to next model... (Model Fallback)");
    }

    throw new Error("All models and providers failed.");
  }
}

// Singleton
export const llmRouter = new LLMRouter();
