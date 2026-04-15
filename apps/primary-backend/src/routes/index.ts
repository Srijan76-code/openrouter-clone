// @ts-ignore
import { Router } from "express";
import { 
  userController, 
  apiKeyController, 
  byoKeyController,
  webhookController
} from "../controllers/index.ts";

import { clerkMiddleware } from "@clerk/express";

export const router = Router();

// Initialize Clerk
router.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY
}));

// User Core
router.get("/users", userController.getAll);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);

// Authenticated Entity Endpoints
router.get("/apikeys", apiKeyController.getAll);
router.post("/apikeys", apiKeyController.create);
router.put("/apikeys/:id", apiKeyController.update);
router.patch("/apikeys/:id/toggle", apiKeyController.toggle);
router.delete("/apikeys/:id", apiKeyController.delete);
router.post("/byokeys", byoKeyController.create);

// Clerk Webhook
router.post("/webhooks/clerk", webhookController.handleClerkWebhook);
