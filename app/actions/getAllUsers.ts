import { db } from "@/lib/db";
import { User } from "@prisma/client";



async function getAllUsers(): Promise<{
    data?: User[];
    error?: string;
}> {
    try{
        const users = await db.user.findMany();
        return { data: users };
    } catch (error) {
        return { error: "Could not retrieve users" };
    }
}

export default getAllUsers;