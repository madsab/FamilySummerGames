"use server"

import { checkUser } from "@/lib/checkUser"
import { db } from "@/lib/db"

async function isCodeUsed(code: string) {
    const {user} = await checkUser();
    const userCodes = await db.user.findUnique({
        where: { email: user?.email },
        select: { codes: true }
    })
    return userCodes?.codes.includes(code)
}

export default isCodeUsed;