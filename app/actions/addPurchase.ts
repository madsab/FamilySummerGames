"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface PurchaseData {
    type: string | null;
    text: string | null;
    price: number | null;
    to?: string | null;
    from: string | null;
    createdAt?: Date;
}

interface PurchaseResult {
    data?: PurchaseData;
    error?: string;
}

async function addPurchase(formData: PurchaseData): Promise<PurchaseResult> {

    //Check if the form data is valid
    if (!formData.text || !formData.to || !formData.price || !formData.from || !formData.type) {
        return { error: "Vennligst fyll ut alle feltene" };
    }


try {
    const purchasingUser = await db.user.findUnique({
        where: {email: formData.from},
    })

    if (!purchasingUser) {
        return { error: "Du er ikke logget inn" };
    }
    if (purchasingUser.money - formData.price < 0) {
        return { error: "Du har ikke nok penger!" };
    }
    const purchaseData: PurchaseData = await db.purchase.create({
        data: {
            type: formData.type,
            text: formData.text,
            price: formData.price,
            to: formData.to,
            from: formData.from,
            createdAt: new Date()
        }
    })
    await db.user.update({
        where: {email: formData.from},
        data: {
            money: {
                decrement: formData.price
            }
        }
    })
    revalidatePath("/shop")
    return { data: purchaseData };

} catch (error) {
    return { error: "Noe gikk galt. Spør Mads" };
}


}

export default addPurchase;