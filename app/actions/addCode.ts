"use server"

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import exp from "constants";

async function addCode(code: string): Promise<{
    data?: string;
    error?: string;
}> {
    const {user} = await checkUser();
    try {
        await db.user.update({
            where: { email: user?.email },
            data: {
                codes: {
                    push: code
                }
            }
        })
        return { data: code }
    } catch (error) {
        return { error: "Could not add code" }
    }
}

export default addCode;