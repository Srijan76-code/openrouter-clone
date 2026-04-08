// ─── Cost Per Token ──────────────────────────────────────────
export interface CostPerToken {
  input: number;
  output: number;
  reasoning?: number;
  cache_read?: number;
}

// ─── Cost Per Request ────────────────────────────────────────
export interface CostPerRequest {
  web_search?: number;
  request?: number;
  image?: number;
}

// ─── Model Registry Entry ────────────────────────────────────
export interface ModelRegistryEntry {
  slug: string;
  provider: string;
  tokenizer: string;

  context_window: number;
  max_input_tokens: number;
  max_output_tokens: number;

  cost_per_token: CostPerToken;
  cost_per_request: CostPerRequest;

  worst_case_cost: number;
}

// ─── OpenRouter Raw Model (API shape) ────────────────────────
export interface OpenRouterModel {
  id: string;
  context_length: number;
  architecture?: { tokenizer?: string };
  pricing?: {
    prompt?: string;
    completion?: string;
    image?: string;
    request?: string;
    internal_reasoning?: string;
    input_cache_read?: string;
    web_search?: string;
  };
  top_provider?: {
    max_completion_tokens?: number | null;
  };
}
