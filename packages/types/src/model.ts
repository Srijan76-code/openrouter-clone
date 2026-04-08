/**
 * @repo/types — Model Types
 *
 * Types for model configuration and model maps.
 */

/** Configuration for a single model */
export interface ModelConfig {
  /** Model identifier (e.g., "google/gemini-2.5-pro") */
  id: string;

  /** Human-readable model name */
  name: string;

  /** Provider that hosts this model */
  providerId: string;

  /** Maximum context window size in tokens */
  contextWindow: number;

  /** Maximum output tokens */
  maxOutputTokens?: number;

  /** Whether the model supports streaming */
  supportsStreaming: boolean;

  /** Whether the model supports tool/function calling */
  supportsFunctionCalling?: boolean;

  /** Whether the model supports vision/image input */
  supportsVision?: boolean;
}

/** Map of model slug → ModelConfig */
export type ModelConfigMap = Record<string, ModelConfig>;
