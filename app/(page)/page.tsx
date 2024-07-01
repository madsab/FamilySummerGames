import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth/authOptions";
import { redirect } from "next/navigation";
import getUserBalance from "../actions/getUserBalance";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Logo from "../(page)/img/FSG_Logo.webp";
import Podium from "../components/Podium";
import getPodium from "../actions/getPodium";
import { toast } from "react-toastify";
import LogOut from "../components/LogOut";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { balance } = await getUserBalance();
  const { first, second, third } = await getPodium();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <div className="w-full bg-slate-800 flex items-center py-3 px-4">
        <Image src={Logo} alt="FSG Logo" width={50} height={50} />
        <p className="text-xl flex-1 flex justify-end items-center">
          <Icon icon={"fluent-emoji:coin"} />
          {balance}
        </p>
      </div>
      <div className="py-4">
        <p className="text-2xl">God dag, {session.user.name}</p>
      </div>
      {first && second && third && <Podium first={first} second={second} third={third} />}
      <LogOut />
    </div>
  );
}
