import Stripe from "stripe";
import dotenv from "dotenv";



dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});


export const createStripePaymentIntent = async ({
    amount,
    internalRef
}: {
    amount: number;
    internalRef: string;
}) => {
   

   
    try{
        const paymentIntent = await stripe.paymentIntents.create({
           amount,
           currency: "xaf",
            automatic_payment_methods: {
               enabled: true,
               allow_redirects: "never"
              },

           metadata: {
            internalRef
           }
        });
        return paymentIntent;

    } catch(error: unknown){
        if(error instanceof stripe.errors.StripeError){
            throw new Error(`Stripe error: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while creating payment intent");
    }
}


