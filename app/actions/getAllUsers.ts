import { db } from "@/lib/db";
import { User } from "@prisma/client";


interface UserResult {
    data?: User[];
    error?: string;
}
async function getAllUsers(): Promise<UserResult> {
    try{
        const users = await db.user.findMany();
        return { data: users };
    } catch (error) {
        return { error: "Could not retrieve users" };
    }
}

export default getAllUsers;