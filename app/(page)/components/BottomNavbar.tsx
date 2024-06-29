"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import cn from "classnames";

const BottomNavbar = () => {
  const router = useRouter();
  const [active, setActive] = React.useState(1);
  return (
    <div className="w-full fixed bg-slate-800 bottom-0 h-20 flex  items-center">
      <div className={cn("flex-1 flex justify-center h-full", active === 0 && " bg-slate-900")}>
        <button
          onClick={() => {
            router.push("/shop"), setActive(0);
          }}
        >
          <Icon icon={"solar:money-bag-outline"} className=" size-7" />
        </button>
      </div>
      <div className={cn("flex-1 flex justify-center h-full", active === 1 && " bg-slate-900")}>
        <button
          onClick={() => {
            router.push("/"), setActive(1);
          }}
        >
          <Icon icon={"akar-icons:home-alt1"} className=" size-7" />
        </button>
      </div>
      <div className={cn("flex-1 flex justify-center h-full", active === 2 && " bg-slate-900")}>
        <button
          onClick={() => {
            router.push("/code"), setActive(2);
          }}
        >
          <Icon icon={"mdi:qrcode-scan"} className=" size-7" />
        </button>
      </div>
    </div>
  );
};

export default BottomNavbar;
