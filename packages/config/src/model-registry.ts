/**
 * @repo/config — Model Registry
 *
 * Loads and provides access to the OpenRouter model registry data.
 * Includes mapping utilities for resolving model slugs.
 *
 * TODO: Migrate logic from:
 *   - packages/utils/modelRegistry.ts
 *   - packages/utils/mapOpenRouterModels.ts
 *   - packages/utils/openrouter_model_registry.json
 */

import type { ModelRegistryEntry } from "@repo/types";

/** In-memory model registry cache */
let registryCache: ModelRegistryEntry[] | null = null;

/**
 * Get all models from the registry.
 * Lazy-loads and caches the registry data.
 */
export function getModelRegistry(): ModelRegistryEntry[] {
  if (!registryCache) {
    // TODO: Load from openrouter-registry.json
    registryCache = [];
  }
  return registryCache;
}

/**
 * Find a model by its slug (e.g., "google/gemini-2.5-pro")
 */
export function findModelBySlug(
  slug: string,
): ModelRegistryEntry | undefined {
  return getModelRegistry().find((m) => m.id === slug);
}

/**
 * Map OpenRouter model data to internal format.
 * TODO: Migrate from packages/utils/mapOpenRouterModels.ts
 */
export function mapOpenRouterModels(
  rawData: unknown[],
): ModelRegistryEntry[] {
  // TODO: Implement mapping logic
  return rawData as ModelRegistryEntry[];
}
