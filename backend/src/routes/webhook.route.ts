import express from "express";
import { stripeWebhookController } from "../controllers/stripeWebHook.controller";

const WebhookRouter = express.Router();

WebhookRouter.post(
  "/stripe",
  express.raw({ type: "*/*" }),
  stripeWebhookController
);

export default WebhookRouter;