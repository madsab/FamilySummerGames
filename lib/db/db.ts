
"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    return (await prisma.user.findMany());
}


export const getUserById = async (id: string) => {
    return (await prisma.user.findUnique({ where: { id } }));
}

export const getUserByName = async (name: string) => {
    const email = name+"@fsg.com"
    return (await prisma.user.findUnique({ where: { email } }));
}

export const getAllFamilyMembers = async (familyName: string) => {
    return (await prisma.user.findMany({ where: { familyName } }));
}