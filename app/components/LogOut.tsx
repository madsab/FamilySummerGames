"use client";
import React from "react";
import Button from "./atoms/Button";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return <Button text="Logg ut" onClick={() => signOut()} />;
};

export default LogOut;
