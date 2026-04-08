// ─── Provider Strategy ───────────────────────────────────────
export type ProviderStrategy = "cheap" | "latency" | "throughput" | "auto";

// ─── Chat Message ────────────────────────────────────────────
export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

// ─── Normalized Chat Request ─────────────────────────────────
export interface NormalizedChatRequest {
  model_slug: string[];
  messages: ChatMessage[];

  temperature: number;
  retry: number;

  provider: ProviderStrategy;
  streaming: boolean;

  preset: boolean;
  message_transform: boolean;
}
