"use server"

import { db } from "@/lib/db";
import { Hint } from "@prisma/client";

async function getHint(active?: boolean, game?:string): Promise<{
    hint?: Hint[];
    error?: string;
}> {
    try{

        if (active || game) {
        const hint = await db.hint.findMany({
            where: {
                OR: [
                    {active: active},
                    {game: game}
                ]
            },

        })
            return { hint };
        }

        const hint = await db.hint.findMany();
        return { hint };
    }
    catch (error) {
        return { error: "Could not retrieve hint" };
    }

}

export default getHint;