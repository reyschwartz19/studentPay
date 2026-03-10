import { updateMinimumPaymentAmount } from "../services/adminSettings.service"; 
import { updatePaymentStatus } from "../services/adminSettings.service";
import { Request, Response } from "express";

export const updateMinimumPaymentAmountController = async (req: Request, res: Response) => {

    const { newAmount } = req.body;

    try {
        const updatedSettings = await updateMinimumPaymentAmount(newAmount);
        res.status(200).json({
            success: true,
            data: updatedSettings
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update minimum payment amount" });
    }
}

export const updatePaymentStatusController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedPayment = await updatePaymentStatus(Number(id), status);
        res.status(200).json({
            success: true,
            data: updatedPayment
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update payment status" });
    }
};