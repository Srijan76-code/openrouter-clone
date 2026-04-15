import { Request, Response } from "express";
import { prisma } from "@repo/db";
import crypto from "crypto";
import { getAuth } from "@clerk/express";

export const apiKeyController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId: clerkUserId } = getAuth(req);
      
      if (!clerkUserId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId }
      });
      
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const keys = await prisma.platformUserApiKey.findMany({
        where: { userId: user.id },
        orderBy: { id: 'desc' }
      });

      res.status(200).json(keys);
    } catch (error) {
      console.error("[getAll ApiKeys Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId: clerkUserId } = getAuth(req);

      if (!clerkUserId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId }
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const { name, rateLimitRPM = 60, rateLimitTPM = 10000, budgetLimit } = req.body;

      const randomBytes = crypto.randomBytes(24).toString('hex');
      const fullKey = `sk-or-v1-${randomBytes}`;

      const keyHash = crypto.createHash('sha256').update(fullKey).digest('hex');
      const maskedKey = `${fullKey.slice(0, 12)}...${fullKey.slice(-3)}`;

      const apiKey = await prisma.platformUserApiKey.create({
        data: {
          userId: user.id,
          keyHash,
          key: maskedKey,
          name: name || "Untitled Key",
          rateLimitRPM,
          rateLimitTPM,
          budgetLimit
        },
      });

      res.status(201).json({ ...apiKey, fullKey });
    } catch (error) {
      console.error("[create ApiKey Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId: clerkUserId } = getAuth(req);

      if (!clerkUserId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId }
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const id = req.params.id as string;
      const { name, budgetLimit } = req.body;

      const apiKey = await prisma.platformUserApiKey.findUnique({
        where: { id: parseInt(id) }
      });

      if (!apiKey) {
        res.status(404).json({ error: "API key not found" });
        return;
      }

      if (apiKey.userId !== user.id) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }

      const updated = await prisma.platformUserApiKey.update({
        where: { id: parseInt(id) },
        data: {
          name: name || apiKey.name,
          budgetLimit: budgetLimit !== undefined ? budgetLimit : apiKey.budgetLimit
        }
      });

      res.status(200).json(updated);
    } catch (error) {
      console.error("[update ApiKey Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  toggle: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId: clerkUserId } = getAuth(req);

      if (!clerkUserId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId }
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const id = req.params.id as string;

      const apiKey = await prisma.platformUserApiKey.findUnique({
        where: { id: parseInt(id) }
      });

      if (!apiKey) {
        res.status(404).json({ error: "API key not found" });
        return;
      }

      if (apiKey.userId !== user.id) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }

      const updated = await prisma.platformUserApiKey.update({
        where: { id: parseInt(id) },
        data: { isActive: !apiKey.isActive }
      });

      res.status(200).json(updated);
    } catch (error) {
      console.error("[toggle ApiKey Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId: clerkUserId } = getAuth(req);

      if (!clerkUserId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId }
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const id = req.params.id as string;

      const apiKey = await prisma.platformUserApiKey.findUnique({
        where: { id: parseInt(id) }
      });

      if (!apiKey) {
        res.status(404).json({ error: "API key not found" });
        return;
      }

      if (apiKey.userId !== user.id) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }

      await prisma.platformUserApiKey.delete({
        where: { id: parseInt(id) }
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("[delete ApiKey Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};