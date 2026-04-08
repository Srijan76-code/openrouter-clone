// ─── Metrics Config ──────────────────────────────────────────
export interface MetricsConfig {
  latency: number;     // 0 → 1 (higher = faster)
  throughput: number;  // 0 → 1
  reliability: number; // 0 → 1
}

// ─── Cost Config ─────────────────────────────────────────────
export interface CostConfig {
  input: number;
  output: number;

  cache?: number;
  reasoning?: number;
}

// ─── Provider Config ─────────────────────────────────────────
export interface ProviderConfig {
  provider: string;        // e.g. "openai", "azure"
  provider_model: string;  // exact provider model name

  cost: CostConfig;
  metrics: MetricsConfig;

  priority?: number;       // optional but recommended
}
