import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth/authOptions";
import { redirect, useRouter } from "next/navigation";
import TestPage from "./pages/TestPage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user) {
    redirect("/signin");
  }
  return (
    <div>
      Hello, {session.user.name}
      <TestPage />
    </div>
  );
}
