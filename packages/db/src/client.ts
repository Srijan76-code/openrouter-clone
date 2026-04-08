import { PrismaClient } from "../generated/prisma/client.js";

// Singleton Prisma client instance
// Prevents multiple instances during hot-reload in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env["NODE_ENV"] !== "production") {
  globalForPrisma.prisma = db;
}
