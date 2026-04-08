import { resolveBucket } from "./buckets.ts";

export const STATUS_ERROR_MAP = new Map<number, string>([
  [400, "BadRequestError"],
  [401, "UnauthorizedError"],
  [403, "ForbiddenError"],
  [404, "NotFoundError"],
  [408, "RequestTimeoutError"],
  [409, "ConflictError"],
  [413, "ContentTooLargeError"],
  [422, "ValidationError"],
  [429, "RateLimitError"],
  [500, "InternalServerError"],
  [502, "BadGatewayError"],
  [503, "ServiceUnavailableError"],
  [504, "GatewayTimeoutError"]
]);

export function heuristicErrorName(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("rate limit")) return "RateLimitError";
  if (msg.includes("timeout")) return "TimeoutError";
  if (msg.includes("socket") || msg.includes("network")) return "ConnectionError";
  if (msg.includes("overloaded") || msg.includes("unavailable")) return "ServiceUnavailableError";
  if (msg.includes("invalid json") || msg.includes("invalid tool")) return "ValidationError";
  if (msg.includes("stream") || msg.includes("chunk")) return "StreamClosedError";

  return "UnknownError";
}

export function classifyErrorUniversal(err: any) {
  let errorName = "UnknownError";

  // -------- Layer 1 : Status --------
  const status = err?.status || err?.response?.status;

  if (status && STATUS_ERROR_MAP.has(status)) {
    errorName = STATUS_ERROR_MAP.get(status)!;
  }
  // -------- Layer 2 : Code / Name --------
  else if (err?.name) {
    errorName = err.name;
  }
  else if (err?.code) {
    errorName = err.code;
  }
  // -------- Layer 3 : Message Heuristic --------
  else if (err?.message) {
    errorName = heuristicErrorName(err.message);
  }

  const bucket = resolveBucket(errorName);

  return {
    errorName,
    bucket
  };
}
