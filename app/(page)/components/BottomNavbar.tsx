"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const BottomNavbar = () => {
  const router = useRouter();
  return (
    <div className="w-full fixed bg-slate-800 bottom-0 px-3 py-6 flex justify-around items-center">
      <button onClick={() => router.push("/shop")}>
        <Icon icon={"solar:money-bag-outline"} className=" size-7" />
      </button>
      <button onClick={() => router.push("/")}>
        <Icon icon={"akar-icons:home-alt1"} className=" size-7" />
      </button>
      <button>
        <Icon icon={"charm:person"} className=" size-7" />
      </button>
    </div>
  );
};

export default BottomNavbar;
