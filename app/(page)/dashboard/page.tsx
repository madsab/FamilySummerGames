import { authOptions } from "@/lib/config/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }
  if (session?.user.role !== "ADMIN") {
    return <div>Not authorized, sorry!</div>;
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
