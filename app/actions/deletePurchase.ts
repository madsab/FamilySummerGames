"use server"

import { db } from "@/lib/db";

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
        return true;
    } catch (error) {
        return false;
    }
}

export default deletePurchase;