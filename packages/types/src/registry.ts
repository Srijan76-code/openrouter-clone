/**
 * @repo/types — Registry Types
 *
 * Types for the model registry (OpenRouter model data).
 */

/** Cost per token in the registry */
export interface CostPerToken {
  /** Cost per prompt/input token (string for precision) */
  prompt: string;

  /** Cost per completion/output token (string for precision) */
  completion: string;

  /** Cost per image token, if applicable */
  image?: string;

  /** Cost per request, if applicable */
  request?: string;
}

/** A single entry in the model registry */
export interface ModelRegistryEntry {
  /** Model ID as used in API requests */
  id: string;

  /** Human-readable model name */
  name: string;

  /** Description of the model */
  description?: string;

  /** Context length in tokens */
  context_length: number;

  /** Pricing information */
  pricing: CostPerToken;

  /** Model architecture details */
  architecture?: {
    tokenizer?: string;
    modality?: string;
  };

  /** Top provider information */
  top_provider?: {
    max_completion_tokens?: number;
    is_moderated?: boolean;
  };
}
