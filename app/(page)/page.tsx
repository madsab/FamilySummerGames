import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth/authOptions";
import { redirect } from "next/navigation";
import getUserBalance from "../actions/getUserBalance";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Logo from "../(page)/img/FSG_Logo.webp";
import Podium from "../components/Podium";
import getPodium from "../actions/getPodium";
import LogOut from "../components/LogOut";
import Rules from "../components/Rules";
import Notifications from "../components/Notifications";
import currencyFormat from "../utils/currencyFormat";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let { balance } = await getUserBalance();
  const { first, second, third } = await getPodium();

  if (!session?.user) {
    redirect("/signin");
  }

  if (!balance) {
    balance = 0;
  }

  return (
    <div className="w-full flex flex-col items-center space-y-3 pb-6">
      <div className="w-full bg-slate-800 fixed top-0 z-10 flex items-center py-3 px-4">
        <Image src={Logo} alt="FSG Logo" width={50} height={50} />
        <p className="text-xl flex-1 flex justify-end items-center">
          <Icon icon={"fluent-emoji:coin"} />
          {currencyFormat(balance)}
        </p>
      </div>
      <div className="h-24"></div>
      <div className="space-y-10 flex flex-col items-center">
        <p className="text-2xl">God dag, {session.user.name}</p>
        {first && second && third && <Podium first={first} second={second} third={third} />}
        <Notifications />
        <Rules />
      </div>
      <LogOut />
      <div className="h-24"></div>
    </div>
  );
}
