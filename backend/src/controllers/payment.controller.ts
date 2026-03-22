import { Request, Response } from "express";
import { createPayment, PaymentResponseDto, updatePaymentProviderTransactionId } from "../services/payment.service";
import { createStripePaymentIntent } from "../services/createStripePaymentIntent.service";


export const createPaymentController = async(
    req: Request,
    res: Response) : Promise<void> => {

    try{
        const payment = await createPayment(req.body);
        const paymentIntent = await createStripePaymentIntent({
            amount: payment.amount,
            internalRef: payment.internalRef
        })

        await updatePaymentProviderTransactionId(payment.id, paymentIntent.id);

        const response: PaymentResponseDto = {
            id: payment.id,
            name: payment.name,
            matricule: payment.matricule,
            amount: payment.amount,
            status: payment.status,
            internalRef: payment.internalRef,
            createdAt: payment.createdAt,
            clientSecret: paymentIntent.client_secret || ""
        }
        res.status(201).json({success: true, data: response});
    }catch(error: unknown){
        if(error instanceof Error){
            res.status(400).json({success: false, message: error.message});
        } else {
            res.status(500).json({success: false, message: "An unexpected error occurred"});
        }
    }

}