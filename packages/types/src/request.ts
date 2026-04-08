/**
 * @repo/types — Request Types
 *
 * Core types for normalized chat requests flowing through the gateway.
 */

/** A single chat message in the conversation */
export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  // TODO: Add support for multi-modal content (images, video)
}

/** Provider routing strategy */
export type ProviderStrategy = "cheap" | "fast" | "balanced" | "quality";

/** Normalized request shape consumed by the LLM router */
export interface NormalizedChatRequest {
  /** Ordered list of model slugs to attempt (fallback chain) */
  model_slug: string[];

  /** Conversation messages */
  messages: ChatMessage[];

  /** Sampling temperature (0-2) */
  temperature?: number;

  /** Maximum retry count on provider failure */
  retry?: number;

  /** Provider selection strategy */
  provider?: ProviderStrategy;

  /** Whether to stream the response via SSE */
  streaming?: boolean;

  /** Whether a preset configuration is active */
  preset?: boolean;

  /** Whether to apply message transformation before sending to provider */
  message_transform?: boolean;
}
