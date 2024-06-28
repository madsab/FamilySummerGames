import React from "react";
import "../globals.css";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full h-screen flex justify-center items-center">
        <main className="bg-slate-600 p-6 rounded-md ">{children}</main>
      </body>
    </html>
  );
}
