"use client";
import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import cn from "classnames";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

interface BottomNavbarProps {
  user: User | undefined;
}
const BottomNavbar: FC<BottomNavbarProps> = ({ user }) => {
  const router = useRouter();
  const activePath = usePathname();
  return (
    <div className="w-full fixed bg-slate-800 bottom-0 h-20 flex  items-center">
      <button
        className={cn("flex-1 flex justify-center items-center h-full", activePath === "/shop" && " bg-slate-900")}
        onClick={() => {
          router.push("/shop");
        }}
      >
        <div>
          <Icon icon={"solar:money-bag-outline"} className=" size-7" />
        </div>
      </button>
      <button
        className={cn("flex-1 flex justify-center items-center h-full", activePath === "/" && " bg-slate-900")}
        onClick={() => {
          router.push("/");
        }}
      >
        <div>
          <Icon icon={"akar-icons:home-alt1"} className=" size-7" />
        </div>
      </button>
      <button
        className={cn("flex-1 flex justify-center items-center h-full", activePath === "/code" && " bg-slate-900")}
        onClick={() => {
          router.push("/code");
        }}
      >
        <div>
          <Icon icon={"mdi:qrcode-scan"} className=" size-7" />
        </div>
      </button>
      {user?.role == "ADMIN" && (
        <button
          className={cn(
            "flex-1 flex justify-center items-center h-full",
            activePath === "/dashboard" && " bg-slate-900"
          )}
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <div>
            <Icon icon={"hugeicons:computer"} className=" size-7" />
          </div>
        </button>
      )}
    </div>
  );
};

export default BottomNavbar;
