"use server"

import { db } from "@/lib/db";
import { Purchase, User } from "@prisma/client";

async function getNotifications(user?: User): Promise<{
    notifications?: Purchase[];
    error?: string;
}>{
    try {
        if (!user) {
            const notifications = await db.purchase.findMany();
            return { notifications };
        }
        const notifications = await db.purchase.findMany({
            where: {
                forFamily: user?.familyName
            }
        })
        return { notifications };
    } catch (error) {
        return { error: "Could not retrieve notifications" };
    }
}

export default getNotifications;