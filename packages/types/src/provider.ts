/**
 * @repo/types — Provider Types
 *
 * Configuration types for LLM provider definitions.
 */

/** Cost configuration per token for a provider */
export interface CostConfig {
  /** Cost per input token (USD) */
  inputCostPerToken: number;

  /** Cost per output token (USD) */
  outputCostPerToken: number;

  /** Optional cost per image (USD) */
  imageCostPerUnit?: number;
}

/** Performance metrics for a provider */
export interface MetricsConfig {
  /** Average latency in milliseconds */
  avgLatencyMs: number;

  /** Tokens per second throughput */
  tokensPerSecond: number;

  /** Uptime percentage (0-100) */
  uptimePercent: number;
}

/** Full provider configuration */
export interface ProviderConfig {
  /** Provider identifier (e.g., "google", "openai", "anthropic") */
  id: string;

  /** Human-readable name */
  name: string;

  /** API base URL */
  baseUrl: string;

  /** Supported model IDs */
  models: string[];

  /** Cost structure */
  cost: CostConfig;

  /** Performance metrics */
  metrics?: MetricsConfig;

  /** Whether this provider is currently enabled */
  enabled: boolean;
}
