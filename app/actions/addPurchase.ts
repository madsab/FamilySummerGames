"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface PurchaseData {
    id?: string;
    type: string | null;
    text: string | null;
    price: number;
    to?: string | null;
    from: string
    createdAt?: Date | null;
    extra?: string[]
    forFamily: string | null;
    area?: "feet" | "hands" | "head" | "torso" | "legs" | "arms" | "back" | "neck" | "face" | "other" | "together";
}

interface PurchaseResult {
    data?: PurchaseData;
    error?: string;
}

async function addPurchase(formData: PurchaseData): Promise<PurchaseResult> {

    //Check if the form data is valid
    if (!formData.text || !formData.to || !formData.price || !formData.from || !formData.type || !formData.forFamily) {
        console.log(formData)
        return { error: "Vennligst fyll ut alle feltene" };
    }


try {
    if (formData.type === "hint"){
        if (formData.text === "Ingen hint"){
            return { error: "Ingen hint å kjøpe" };
        }
        const hints = await db.user.findUnique({
            where: {email: formData.from},
            select: {hints: true}
        })
        if (hints?.hints.includes(formData.text)){
            return { error: "Du har allerede kjøpt dette hintet" };
        }
        await db.user.update({
            where: {email: formData.from},
            data: {
                hints: {
                    push: formData.text
                }
            }
        })

    }

    const purchasingUser = await db.user.findUnique({
        where: {email: formData.from},
    })


    if (!purchasingUser) {
        return { error: "Du er ikke logget inn" };
    }
    if (purchasingUser.money - formData.price < 0) {
        return { error: "Du har ikke nok penger!" };
    }

    //Check if victim already has a disadvantage of the same type
    if (formData.type === "ulempe" && formData.area){
        const victim = await db.user.findUnique({
            where: {email: formData.to},
        })

        if(!victim){
            return { error: "Brukeren du prøver å gi ulempen til eksisterer ikke" };
        }
        if (victim.disadventages.includes(formData.area)){
            return { error: "Denne personen kan ikke få denne ulempen" };
        }
        await db.user.update({
            where: {email: formData.to},
            data: {
                disadventages: {
                    push: formData.area
                }
            }
        })
    }
    const purchaseData: PurchaseData = await db.purchase.create({
        data: {
            type: formData.type,
            text: formData.text,
            price: formData.price,
            to: formData.to,
            from: formData.from,
            createdAt: new Date(),
            extra: formData.extra,
            forFamily: formData.forFamily
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