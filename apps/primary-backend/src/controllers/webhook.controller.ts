import { Request, Response } from "express";
import { prisma } from "@repo/db";
import { Webhook } from "svix";

export const webhookController = {
  handleClerkWebhook: async (req: Request, res: Response): Promise<void> => {
    try {
      const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

      if (!webhookSecret) {
        res.status(500).json({ error: "Webhook secret not configured" });
        return;
      }

      // req.body must be the raw body string/Buffer (not parsed JSON)
      const rawBody = req.body.toString();
      const svixId = req.headers["svix-id"] as string;
      const svixTimestamp = req.headers["svix-timestamp"] as string;
      const svixSignature = req.headers["svix-signature"] as string;

      if (!svixId || !svixTimestamp || !svixSignature) {
        res.status(400).json({ error: "Missing webhook headers" });
        return;
      }

      // Verify signature using svix
      const wh = new Webhook(webhookSecret);
      const event = wh.verify(rawBody, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as { type: string; data: any };

      const { type, data } = event;

      if (type === "user.created") {
        const clerkUserId = data.id;
        const username = data.username || data.first_name || null;

        const user = await prisma.user.upsert({
          where: { clerkUserId },
          update: { username },
          create: { clerkUserId, username, credits: 5000000 },
        });

        res.status(200).json({ success: true, userId: user.id });
        return;
      }

      if (type === "user.deleted") {
        const clerkUserId = data.id;

        try {
          await prisma.user.delete({ where: { clerkUserId } });
        } catch {
          console.warn(`[Webhook] User not found or already deleted: ${clerkUserId}`);
        }

        res.status(200).json({ success: true });
        return;
      }

      // Unhandled event type
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("[Webhook Error]", error.message);
      res.status(400).json({ error: "Webhook verification failed" });
    }
  },
};