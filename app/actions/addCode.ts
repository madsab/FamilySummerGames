"use server"

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import exp from "constants";
import { getServerSession } from "next-auth";

async function addCode(code: string): Promise<{
    data?: string;
    error?: string;
}> {
    const session = await getServerSession();
    if (!session?.user) {
        return { error: "You must be signed in to call this API" };
    }

    try {
        await db.user.update({
            where: { email: session.user?.email },
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