import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { llmRouter } from "./router/llm-router.ts";
import type { NormalizedChatRequest } from "@repo/types";

class ApiGateway {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3001;

    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    // Health check for browsers
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ 
        status: "online", 
        service: "api-gateway", 
        message: "Send POST requests to /chat/completions" 
      });
    });

    // OpenAI SDK standard path
    this.app.post("/v1/chat/completions", this.handleChatCompletions);

    this.app.post("/chat/completions", this.handleChatCompletions);
  }

  private normalizeRequest(data: any): NormalizedChatRequest {
    const mainModel = data.model;
    const fallbackModels = data.extra?.fallback_models || [];
    const model_slugs = [mainModel, ...fallbackModels].filter(Boolean);

    return {
      model_slug: model_slugs,
      messages: data.messages || [],
      temperature: data.temperature ?? 0.7,
      retry: data.extra?.retry ?? 0,
      provider: data.extra?.provider ?? "cheap",
      streaming: data.stream ?? false,
      preset: data.extra?.preset ?? false,
      message_transform: data.extra?.message_transform ?? false,
    };
  }

  private handleChatCompletions = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      const data = req.body;
      const authorization = req.headers["authorization"];

      const normalized = this.normalizeRequest(data);

      console.log("normalized:", normalized);

      const response = await llmRouter.callLlm(normalized);

      console.log("response from llm router:", response);
      res.json(response);
    } catch (error: any) {
      console.error(error);
      
      if (error.name === "ModelNotRegisteredError") {
        res.status(404).json({
          error: {
            message: "model is not registered",
            type: "invalid_request_error",
            param: "model",
            code: "model_not_found"
          }
        });
        return;
      }

      res.status(500).json({ error: "Failed to process request" });
    }
  };

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`API Gateway running at http://localhost:${this.port}`);
      console.log(`POST http://localhost:${this.port}/chat/completions`);
    });
  }
}

const gateway = new ApiGateway();
gateway.start();
