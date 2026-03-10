import { Request, Response } from "express";
import { getFilteredPayments, getAllPayments, AdminFiltersDTO  } from "../services/adminFilters.service";
import { PaymentStatus } from "@prisma/client/edge";

export const getAllPaymentsController = async (req: Request, res: Response) => {
    try {
        const payments = await getAllPayments();
        const response: AdminFiltersDTO[] = payments.map(payment => ({
            id: payment.id,
            name: payment.name,
            matricule: payment.matricule,
            amount: payment.amount,
            status: payment.status,
            internalRef: payment.internalRef,
            createdAt: payment.createdAt
        }))
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch payments" });
    }
};



export const getFilteredPaymentsController = async (req: Request, res: Response) => {
    
    try {
       const status = req.query.status as PaymentStatus | undefined;
       const departmentId = req.query.departmentId ? Number(req.query.departmentId) : undefined;
       const levelId = req.query.levelId ? Number(req.query.levelId) : undefined;
       const schoolYearId = req.query.schoolYearId ? Number(req.query.schoolYearId) : undefined;    
       const payments = await getFilteredPayments({ status, departmentId, levelId, schoolYearId });
        const response: AdminFiltersDTO[] = payments.map(payment => ({
            id: payment.id,
            name: payment.name,
            matricule: payment.matricule,
            amount: payment.amount,
            status: payment.status,
            internalRef: payment.internalRef,
            createdAt: payment.createdAt
        }));
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch filtered payments" });
    }
};
