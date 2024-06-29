"use client";
import React from "react";
import Button from "../../components/Button";
import { signOut } from "next-auth/react";

const TestPage = () => {
  return (
    <div>
      <h1>Test</h1>
      <Button text="Sign out" onClick={() => signOut()} />
    </div>
  );
};

export default TestPage;
