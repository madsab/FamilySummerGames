"use server"

import { db } from "@/lib/db"
import { Disadvantage } from "@/types/disadvantage"
import disadvantages from "@/app/utils/disadvantage.json"
import { Purchase } from "@prisma/client"

async function getDisadvantages(): Promise<{
    dis?: Disadvantage[]
    error?: string
}> {
    try {
        const res = await db.purchase.findMany()
        console.log("Res: ", res)
        if (res.length === 0) {
            return { dis: disadvantages }
        }
        const disadvantagesUsed = res.reduce(
            (acc: Record<string, number>, value: Purchase) => {
                acc[value.text] = (acc[value.text] || 0) + 1;
                return acc;
        }, {} as Record<string, number>);
        console.log("Used: ", disadvantagesUsed)
        console.log("Disadvantages: ", disadvantages)
        const data = disadvantages.filter((disadvantage) => (
            disadvantagesUsed[disadvantage.title] < disadvantage.amount || !disadvantagesUsed[disadvantage.title]
        ))
        console.log("Data: ", data)
        return { dis: data}
    } catch (error) {
        return { error: "Could not retrieve disadvantages" }
    }
}

export default getDisadvantages