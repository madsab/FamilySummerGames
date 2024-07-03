"use server"

import { Hint } from "@/types/hint";
import hints from "@/app/utils/hint.json";

async function getHint(active?: boolean, game?:string): Promise<{
    hint?: Hint[];
    error?: string;
}> {
    try{
        let hint = hints as Hint[];
        if (game) {
            hint = hint.filter((h) => h.game === game);
        }
        if (active) {
            hint = hint.filter((h) => h.active);
        }
        return { hint };
    }
    catch (error) {
        return { error: "Could not retrieve hint" };
    }

}

export default getHint;