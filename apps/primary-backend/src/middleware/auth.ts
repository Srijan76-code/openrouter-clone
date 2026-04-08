import type { Request, Response, NextFunction } from "express";

/**
 * Authentication middleware
 * Validates the Authorization header and attaches user info to the request.
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid authorization header" });
    return;
  }

  // TODO: Validate token and attach user to request
  // const token = authHeader.split(" ")[1];
  // const user = await validateToken(token);
  // req.user = user;

  next();
}
