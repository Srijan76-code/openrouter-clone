/**
 * @repo/utils — Cost Calculator
 *
 * Calculates cost for LLM API calls based on token usage and provider pricing.
 * Shared across api-gateway and primary-backend.
 *
 * TODO: Migrate cost_Calculation logic from api-gateway adapter.ts
 */

import type { CostPerToken } from "@repo/types";

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface CostBreakdown {
  promptCost: number;
  completionCost: number;
  totalCost: number;
  currency: "USD";
}

/**
 * Calculate the cost of an LLM API call based on token usage and pricing.
 */
export function calculateCost(
  usage: TokenUsage,
  pricing: CostPerToken,
): CostBreakdown {
  const promptRate = parseFloat(pricing.prompt);
  const completionRate = parseFloat(pricing.completion);

  const promptCost = usage.promptTokens * promptRate;
  const completionCost = usage.completionTokens * completionRate;

  return {
    promptCost,
    completionCost,
    totalCost: promptCost + completionCost,
    currency: "USD",
  };
}
