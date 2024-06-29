import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user) {
    return <div>Not logged in</div>;
  }
  return <div>Hello, {session.user.money}</div>;
}
