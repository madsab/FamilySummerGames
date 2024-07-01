"use server"
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";


async function addMoney(amount:number): Promise<{
    data?: number;
    error?: string;
}> {
    const session = await getServerSession();

    if (!session) {
        return { error: "You are not logged in" }
    }

    if (!session?.user) {
        return { error: "You are not logged in" }
    }
    try {
        const user = await db.user.update({
            where: {email: session.user.email},
            data: {
                money: {
                    increment: amount
                }
            }
        })
        return { data: user.money }

    } catch (error) {
        return { error: "Could not add money" }
    }
}

export default addMoney;