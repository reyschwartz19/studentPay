import { PaymentStatus } from "@prisma/client";
import prisma from "../config/prisma";

export interface AdminFiltersDTO {
    id: number;
    name: string;
    matricule: string;
    amount: number;
    status: PaymentStatus;
    internalRef: string;
    createdAt: Date;
}


export const getAllPayments = async () =>{
    const payments = await prisma.payment.findMany({
        orderBy: {createdAt: "desc"}
    })
    return payments;
}

// export const getPaymentByProviderRef = async (providerRef: string) => {
//     const payment = await prisma.payment.findUnique({
//         where: {
//             providerTransactionId: providerRef,
//         }
//     })
//     return payment;
// }

// export const getPaymentByInternalRef = async (internalRef: string) => {
//     const payment = await prisma.payment.findUnique({
//         where: {
//             internalRef: internalRef,
//         }
//     })
//     return payment;
// }

// export const getPaymentById = async (id: number) => {
//     const payment = await prisma.payment.findUnique({
//         where: {
//             id: id,
//         }
// })
//     return payment;
// }

// export const getPaymentsByStatus = async (status: PaymentStatus) => {
//     const payments = await prisma.payment.findMany({
//         where: {
//             status: status,
//         }
//     })
//     return payments;
// }

export const updatePaymentStatus = async (id: number, status: PaymentStatus) => {
    const payment = await prisma.payment.update({
        where: {
            id: id,
        },
        data: {
            status: status,
        }
    })
    return payment;
}

export const getFilteredPayments = async(
    {
        status,
        departmentId,
        levelId,
        schoolYearId
    }: {
        status?: PaymentStatus;
        departmentId?: number;
        levelId?: number;
        schoolYearId?: number;
    }
) => {
    return prisma.payment.findMany({
        where: {
            status: status,
            departmentId: departmentId,
            levelId: levelId,
            schoolYearId: schoolYearId,
        }
    })
}