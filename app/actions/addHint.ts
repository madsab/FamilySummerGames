"use server"

import { db } from "@/lib/db";
import { Hint } from "@prisma/client"

async function addHint(hint?: Hint): Promise<{
    data?: Hint;
    error?: string;
}> {
    if (!hint) {
        return { error: "No hint to add" }
    }
    try {
        const addedHint = await db.hint.create({
            data: {
                ...hint
            }
        })
        return { data: addedHint }
    } catch (error) {
        return { error: "Could not add hint" }
    }

}

export default addHint;