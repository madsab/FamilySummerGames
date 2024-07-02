"use server"

import { checkUser } from "@/lib/checkUser"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth";

async function isCodeUsed(code: string) {
    const session = await getServerSession();
    if (!session?.user) {
        return { error: "You must be signed in to call this API" };
    }

    const userCodes = await db.user.findUnique({
        where: { email: session.user?.email },
        select: { codes: true }
    })
    return userCodes?.codes.includes(code)
}

export default isCodeUsed;