"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function deletePurchase(id?: string): Promise<boolean> {
    try {
        if(!id) {
            await db.purchase.deleteMany();
        } else {
            await db.purchase.delete({
                where: {
                    id
                }
            })
        }
        revalidatePath("/dashboard")
        return true;
    } catch (error) {
        return false;
    }
}

export default deletePurchase;