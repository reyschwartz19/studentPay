import prisma from "../config/prisma";

export interface AdminSettingsDTO {
    id: number;
    minimumPaymentAmount: number;
}

export const getMinimumPaymentAmount = async (newAmount: number): Promise<AdminSettingsDTO> => {

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

