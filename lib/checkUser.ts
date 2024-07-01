import { getServerSession } from "next-auth";
import { authOptions } from "./config/auth/authOptions";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export const checkUser: () => Promise<{
    user?: User;
    error?: string;
}>= async () => {
    try{
        const session = await getServerSession(authOptions);
        if (!session) {
            redirect("/signin");

        }
        if (!session?.user) {
            redirect("/signin");
        }
        const user = session.user as User;
        return { user }

    } catch (error) {
        return { error: "Could not retrieve user" };
    }

}