"use server"
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";


async function addMoney(amount:number): Promise<{
    data?: number;
    error?: string;
}> {
    const {user, error} = await checkUser();
    if (error) {
        return { error };
    }
    try {
        const updatedUser = await db.user.update({
            where: {email: user?.email},
            data: {
                money: {
                    increment: amount
                }
            }
        })
        return { data: updatedUser.money }

    } catch (error) {
        return { error: "Could not add money" }
    }
}

export default addMoney;