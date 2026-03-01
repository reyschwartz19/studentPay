import prisma from "../config/prisma";

type referenceInput = {
    id: number;
    name: string;
}

export const getDepartments = async (): Promise<referenceInput[]> => {
     const departments = await prisma.department.findMany({
        select: {
            id: true,
            name: true
        },
        orderBy: {
            name: "asc"
        }
    }
     );
     return departments;
}

export const getLevels = async (): Promise<referenceInput[]> => {
    const levels = await prisma.level.findMany({
        select: {
            id: true,
            name: true
        },
        orderBy: {
            name: "asc"
        }
    });
    return levels;
}