"use server"
import { db } from "@/lib/db";

async function setHint(game: string): Promise<{
    data?: string
    error?: string
    }> {
        if (game === "") {
            return { error: "No game provided" };
        }

    try {
        await db.hint.updateMany({
            where: {active: true},
            data: {
                active: false
            }
        })
        await db.hint.update({
            where: {game},
            data: {
                active: true
            }

        })

        return { data: "Hint set"};

    } catch (error) {
        return { error: "Could not set hint" };
    }
}

export default setHint;