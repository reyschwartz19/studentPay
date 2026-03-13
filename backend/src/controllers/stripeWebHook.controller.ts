import { Request, Response } from "express";
import Stripe from "stripe";
import { handleStripeWebhookEvent } from "../services/stripeWebhook.service";
import dotenv from "dotenv";



dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export const stripeWebhookController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const signature = req.headers["stripe-signature"];
    if(!signature){
        res.status(400).send("Missing Stripe Signature");
        return;
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch(error) {
        res.status(400).json({
            message: "Webhook signature verification failed"
        });
        return;
    }
    try{
        await handleStripeWebhookEvent(event);

        res.status(200).json({received: true})
    } catch(error){
        res.status(500).json({
            message: "Webhook processing failed"
        })
    }
}