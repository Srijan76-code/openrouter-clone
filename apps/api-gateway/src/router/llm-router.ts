import { type AIProvider, GeminiProvider } from "../providers/gemini-provider.ts";
import type { NormalizedChatRequest } from "@repo/types";
import { modelProvider } from "@repo/config";
import { messageTransformer } from "../transform/message-transformer.ts";
import { RetryHandler, type RetryPolicy, DEFAULT_RETRY_POLICY } from "./retry-handler.ts";
import { getProviderStrategy } from "./provider-strategy.ts";
import { decide, RouterAction } from "./decision-engine.ts";
import { TelemetryCollector } from "../telemetry/collector.ts";
import "dotenv/config";

export class LLMRouter {
  private providers: Map<string, AIProvider>;
  private retryHandler: RetryHandler;

  constructor(retryPolicy: RetryPolicy = DEFAULT_RETRY_POLICY) {
    this.providers = new Map();
    this.providers.set("google", new GeminiProvider());
    this.retryHandler = new RetryHandler(retryPolicy);
  }

  private returnUserError(error: any) {
    throw error;
  }

  private crashAndFixDev(error: any) {
    throw error;
  }

  private getApiKey(): string {
    const key = process.env.GEMINI_API_KEY || "";
    if (!key) {
      throw new Error("API Key is missing in environment variables.");
    }
    return key;
  }

  private async executeWithRetry(
    providerInstance: AIProvider,
    modelName: string,
    normalized: NormalizedChatRequest,
    collector: TelemetryCollector,
    providerName: string,
  ) {
    let lastError: any;

    for (let attempt = 0; attempt < this.retryHandler.maxAttempts; attempt++) {
      const stepIndex = collector.startStep(modelName, providerName, {
        model: modelName,
        messages: normalized.messages,
        temperature: normalized.temperature,
        provider_strategy: normalized.provider,
      });

      try {
        const apiKey = this.getApiKey();
        const result = await providerInstance.generateChat(
          modelName,
          normalized.messages,
          normalized,
          apiKey,
        );

        collector.completeStep(stepIndex, {
          content: typeof result === "string" ? result : JSON.stringify(result),
          provider: providerName,
          actualModel: modelName,
        });

        return result;
      } catch (error) {
        lastError = error;
        collector.failStep(stepIndex, (error as Error).message || String(error));

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

        const delay = this.retryHandler.computeDelay(attempt);
        console.log(`[Retry] ${modelName} attempt ${attempt + 1} → ${delay}ms`);
        await this.retryHandler.sleep(delay);
      }
    }

    throw lastError;
  }

  async callLlm(normalized: NormalizedChatRequest) {
    const collector = new TelemetryCollector({
      model: normalized.model_slug.join(", "),
      messages: normalized.messages,
      temperature: normalized.temperature,
      provider_strategy: normalized.provider,
    });

    console.log(`\n[Stage 1: Routing Start] Models: ${normalized.model_slug.join(", ")}`);

    try {
      let missingModels = 0;

      for (const model of normalized.model_slug) {
        const modelName = model.split("/")[1];
        console.log(`\n[Stage 2: Model Selection] Attempting model: ${modelName}`);

        const modelConfig = modelName && modelProvider[modelName];

        if (!modelConfig) {
          console.log(`[Model Fail] ${modelName} is completely missing from config`);
          missingModels++;
          continue;
        }

        const providerList = getProviderStrategy(modelConfig, normalized.provider);
        console.log(`[Stage 3: Provider Strategy] '${normalized.provider}'. Providers: ${providerList.map(p => p.provider).join(", ")}`);

        for (const providerMeta of providerList) {
          const providerInstance = this.providers.get(providerMeta.provider);
          if (!providerInstance) continue;

          try {
            let messages = normalized.messages;
            if (normalized.message_transform) {
              messages = messageTransformer.transform(messages, modelConfig.max_tokens);
            }

            console.log(`[Stage 5: Execution] Calling ${providerMeta.provider} -> ${modelName}`);
            const response = await this.executeWithRetry(
              providerInstance,
              modelName,
              { ...normalized, messages },
              collector,
              providerMeta.provider,
            );

            console.log(`[Stage 6: Success] Response received from ${providerMeta.provider}`);

            collector.completeRun({
              content: typeof response === "string" ? response : JSON.stringify(response),
              provider: providerMeta.provider,
              actualModel: modelName,
            });

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

            continue;
          }
        }

        console.log(`[Model Fail] ${modelName} exhausted`);
      }

      if (missingModels === normalized.model_slug.length) {
        const err = new Error("model is not registered");
        err.name = "ModelNotRegisteredError";
        collector.failRun(err.message);
        throw err;
      }

      const err = new Error("All models and providers failed.");
      collector.failRun(err.message);
      throw err;
    } catch (error) {
      if (collector) {
        collector.failRun((error as Error).message || String(error));
      }
      throw error;
    }
  }
}

export const llmRouter = new LLMRouter();
