/**
 * @repo/config — Model Provider Map
 *
 * Defines which providers host which models, along with
 * provider-specific configuration (API keys, base URLs, etc.).
 *
 * TODO: Migrate content from packages/utils/modelProviderList/
 *       and any model_provider.ts data here.
 */

import type { ProviderConfig } from "@repo/types";

/** Map of provider ID → provider configuration */
export const modelProviderMap: Record<string, ProviderConfig> = {
  // TODO: Populate with provider configs
  // Example:
  // google: {
  //   id: "google",
  //   name: "Google AI",
  //   baseUrl: "https://generativelanguage.googleapis.com",
  //   models: ["gemini-2.5-pro", "gemini-2.5-flash"],
  //   cost: { inputCostPerToken: 0.000001, outputCostPerToken: 0.000002 },
  //   enabled: true,
  // },
};
