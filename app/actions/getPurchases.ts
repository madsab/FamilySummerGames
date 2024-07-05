"use server"

import { User } from "@prisma/client";
import { PurchaseData } from "./addPurchase";
import { db } from "@/lib/db";

async function getPurchases(userEmail: string): Promise<{
    purchases?: PurchaseData[];
    error?: string;
}> {
    if (!userEmail) {
        return { error: "No user" };
    }
    try {
        const res = await db.purchase.findMany({
            where: {
                from: userEmail,
            },
        })
        return { purchases: res };
    } catch (error) {
        return { error: error as string };
    }
}

export default getPurchases;