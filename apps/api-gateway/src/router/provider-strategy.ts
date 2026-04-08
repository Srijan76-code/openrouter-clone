import { ModelConfig } from "../../data/model_provider.ts";

export function getProviderStrategy(modelConfig: ModelConfig, type: string) {
  const providers = [...modelConfig.providers];

  if (type === "cheap") {
    return providers.sort(
      (a, b) => a.cost.input + a.cost.output - (b.cost.input + b.cost.output),
    );
  } else if (type === "fast") {
    return providers.sort((a, b) => a.metrics.latency - b.metrics.latency);
  } else if (type === "throughput") {
    return providers.sort(
      (a, b) => b.metrics.throughput - a.metrics.throughput,
    );
  } else {
    return providers.sort(
      (a, b) =>
        b.metrics.reliability * 0.5 -
        (b.cost.input + b.cost.output) -
        (a.metrics.reliability * 0.5 - (a.cost.input + a.cost.output)),
    );
  }
}
