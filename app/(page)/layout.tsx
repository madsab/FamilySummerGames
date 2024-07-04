import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import cn from "classnames";
import BottomNavbar from "../components/organisms/BottomNavbar";
import { getServerSession } from "next-auth";
import Provider from "../context/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authOptions } from "@/lib/config/auth/authOptions";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Family Summer Games 2024",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  return (
    <html lang="en">
      <body className={cn(inter.className, "w-full flex flex-col items-center h-screen")}>
        <Provider session={session}>
          {children}
          <BottomNavbar user={user} />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
