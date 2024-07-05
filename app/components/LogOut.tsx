"use client";
import React from "react";
import Button from "./atoms/Button";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return <Button onClick={() => signOut()}>Logg ut</Button>;
};

export default LogOut;
