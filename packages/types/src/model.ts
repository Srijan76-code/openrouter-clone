import type { ProviderConfig } from "./provider.ts";

// ─── Model Config ────────────────────────────────────────────
export interface ModelConfig {
  max_tokens: number;
  streaming: boolean;

  providers: ProviderConfig[];
}

// ─── Model Config Map ────────────────────────────────────────
export interface ModelConfigMap {
  [modelName: string]: ModelConfig;
}
