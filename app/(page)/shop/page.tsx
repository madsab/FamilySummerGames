import React from "react";
import ShopItem from "../../components/ShopItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth/authOptions";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Shop from "../pages/Shop";

const ShopPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="h-full w-full">
      <div className="mx-5 flex flex-col items-center">
        <p className="text-2xl">Butikk</p>
        <hr className="text-white w-full h-1" />
      </div>
      <div className="mt-3 flex justify-center items-center">
        <Icon icon={"fluent-emoji:coin"} className="size-8" />
        <p>: {session.user.money}</p>
      </div>
      <Shop />
    </div>
  );
};

export default ShopPage;
