import React from "react";
import "../globals.css";
import Provider from "../context/Provider";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full h-screen flex justify-center items-center">
        <Provider>
          <main className="bg-slate-600 p-6 rounded-md ">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
