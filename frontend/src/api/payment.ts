import {fetcher} from "./client";

export const createPayment = async (payload: {
    name: string;
    matricule: string;
    departmentId: string;
    levelId: string;
    amount: number;
}) => {
    return fetcher("/payments",{
        method: "POST",
        body: JSON.stringify(payload)
    });
};