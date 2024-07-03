"use server"
import jsonData from "@/app/utils/hint.json";
import { revalidatePath } from "next/cache";
import {writeFileSync} from "node:fs";

async function setHint(game: string): Promise<{
    data?: string
    error?: string
    }> {
        if (game === "") {
            return { error: "No game provided" };
        }
        const newData = jsonData.map((hint) => {
            if (hint.active) {
                return { ...hint, active: false };
            } else if (hint.game === game) {
                return { ...hint, active: true };
            }
            return hint;
            })

    try {
        writeFileSync("app/utils/hint.json", JSON.stringify(newData));
        revalidatePath("/shop")
        return { data: "Hint set"};

    } catch (error) {
        return { error: "Could not set hint" };
    }
}

export default setHint;