"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useRouter as Router } from "next/router";
import cn from "classnames";
import { getServerSideProps } from "next/dist/build/templates/pages";

const BottomNavbar = () => {
  const router = useRouter();
  const [active, setActive] = React.useState(1);
  return (
    <div className="w-full fixed bg-slate-800 bottom-0 h-20 flex  items-center">
      <button
        className={cn("flex-1 flex justify-center items-center h-full", active === 0 && " bg-slate-900")}
        onClick={() => {
          router.push("/shop"), setActive(0);
        }}
      >
        <div>
          <Icon icon={"solar:money-bag-outline"} className=" size-7" />
        </div>
      </button>
      <button
        className={cn("flex-1 flex justify-center items-center h-full", active === 1 && " bg-slate-900")}
        onClick={() => {
          router.push("/"), setActive(1);
        }}
      >
        <div>
          <Icon icon={"akar-icons:home-alt1"} className=" size-7" />
        </div>
      </button>
      <button
        className={cn("flex-1 flex justify-center items-center h-full", active === 2 && " bg-slate-900")}
        onClick={() => {
          router.push("/code"), setActive(2);
        }}
      >
        <div>
          <Icon icon={"mdi:qrcode-scan"} className=" size-7" />
        </div>
      </button>
    </div>
  );
};

export default BottomNavbar;
