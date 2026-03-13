import Stripe from "stripe";
import { updatePaymentStatusByInternalRef } from "./payment.service";

export const handleStripeWebhookEvent = async (
    event: Stripe.Event
): Promise<void> => {
    switch(event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            const internalRef = paymentIntent.metadata.internalRef
            if(!internalRef) {
                throw new Error("Missing internalRef in Stripe MetaData");
            }
            await updatePaymentStatusByInternalRef(internalRef, "COMPLETED")    

            break
        }
        
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            const internalRef = paymentIntent.metadata.internalRef
            if(!internalRef) {
                throw new Error("Missing internalRef in Stripe MetaData");
            }
            await updatePaymentStatusByInternalRef(internalRef, "FAILED") 

            break
        }
        default:
        break
    }
}