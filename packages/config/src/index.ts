// @repo/config — Shared configuration data
// Provider maps, model registry, and strategy definitions.

export { modelProviderMap } from "./model-provider.ts";
export {
  getModelRegistry,
  findModelBySlug,
  mapOpenRouterModels,
} from "./model-registry.ts";
