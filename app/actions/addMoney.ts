"use server"
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


async function addMoney(amount:number, userEmail?:string): Promise<{
    data?: number;
    error?: string;
}> {
    const session = await getServerSession();
    if (!session?.user) {
        return { error: "You must be signed in to get money" };
    }

    try {
        const updatedUser = await db.user.update({
            where: {email: userEmail ? userEmail : session.user?.email},
            data: {
                money: {
                    increment: amount
                }
            }
        })
        revalidatePath("/shop")
        return { data: updatedUser.money }
    } catch (error) {
        return { error: "Could not add money" }
    }
}

export default addMoney;