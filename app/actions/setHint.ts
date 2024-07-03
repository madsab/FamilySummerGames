"use server"
import jsonData from "@/app/utils/hint.json";
import { revalidatePath } from "next/cache";
import {writeFileSync} from "node:fs";

function setHint(game: string ) {;
    const newData = jsonData.map((hint) => {
        if (hint.active) {
            return { ...hint, active: false };
        } else if (hint.game === game) {
            return { ...hint, active: true };
        }
        return hint;
    })
    writeFileSync("app/utils/hint.json", JSON.stringify(newData));
    revalidatePath("/shop")
}

export default setHint;