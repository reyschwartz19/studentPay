import prisma from "../config/prisma";
import { PaymentStatus } from "@prisma/client/edge";

export interface AdminSettingsDTO {
    id: number;
    minimumPaymentAmount: number;
}

export const updateMinimumPaymentAmount = async (newAmount: number): Promise<AdminSettingsDTO> => {

    const settings = await prisma.adminSetting.update({
        where: {
            id: 1,
        },
        data: {
            minimumPaymentAmount: newAmount,
        }
    });
    return settings;
}

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