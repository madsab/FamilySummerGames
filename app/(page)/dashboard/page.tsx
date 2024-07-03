import getHint from "@/app/actions/getHint";
import D_Hint from "@/app/components/D_Hint";
import { authOptions } from "@/lib/config/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const { hint } = await getHint();

  if (!session?.user) {
    redirect("/login");
  }
  if (session?.user.role !== "ADMIN") {
    return <div>Not authorized, sorry!</div>;
  }

  return (
    <div className="m-5 w-full flex flex-col items-center">
      <p className="text-xl">Dashboard</p>
      <D_Hint hints={hint || []} />
    </div>
  );
};

export default Dashboard;
