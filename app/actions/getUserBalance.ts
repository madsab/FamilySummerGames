"use server"

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";


async function getUserBalance(
): Promise<{
    balance?: number;
    error?: string;
}> {

    const session = await getServerSession();

    if (!session?.user) {
        return { error: "No user" };
    }

const email = session.user.email || "";
    try {
        const balance = await db.user.findUnique({
            where: { email},
            select: { money: true }
        })

        return { balance: balance?.money || 0}
    } catch (error) {
        return { error: "Could not retrive balance: Ask Mads" };
    }
}

export default getUserBalance;