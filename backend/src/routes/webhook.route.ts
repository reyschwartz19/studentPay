import express from "express";
import { stripeWebhookController } from "../controllers/stripeWebHook.controller";

const WebhookRouter = express.Router();

WebhookRouter.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhookController
);

export default WebhookRouter;