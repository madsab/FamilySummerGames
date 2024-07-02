"use server"

import { db } from "@/lib/db";
import { Hint } from "@prisma/client";

async function getHint(): Promise<{
    hint?: Hint;
    error?: string;
}> {
    try{
        const hint = await db.hint.findMany({
            take: 1,
        })
        return { hint: hint[0] };
    }
    catch (error) {
        return { error: "Could not retrieve hint" };
    }

}

export default getHint;