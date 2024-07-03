import getHint from "@/app/actions/getHint";
import getNotifications from "@/app/actions/getNotifications";
import D_Hint from "@/app/components/D_Hint";
import D_Notfication from "@/app/components/D_Notfication";
import { authOptions } from "@/lib/config/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const { hint } = await getHint();
  const { notifications } = await getNotifications();

  if (!session?.user) {
    redirect("/login");
  }
  if (session?.user.role !== "ADMIN") {
    return <div>Not authorized, sorry!</div>;
  }

  return (
    <div className="m-5 w-full flex flex-col items-center space-y-4">
      <p className="text-xl">Dashboard</p>
      <D_Hint hints={hint || []} />
      <D_Notfication notifications={notifications || []} />
    </div>
  );
};

export default Dashboard;
