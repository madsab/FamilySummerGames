import { getServerSession } from "next-auth";
import { authOptions } from "./config/auth/authOptions";
import { redirect } from "next/navigation";

export const checkUser = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/signin");
    }
    if (!session?.user) {
        return redirect("/signin");
    }

    return session.user;
}