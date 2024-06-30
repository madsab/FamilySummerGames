"use client";
import addMoney from "@/app/actions/addMoney";
import checkValidCode from "@/app/actions/checkValidCode";
import Button from "@/app/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect } from "react";
import { toast } from "react-toastify";

const CodePage = () => {
  const [code, setCode] = React.useState("");
  const possibleCode = useSearchParams().get("code");

  if (possibleCode) {
    setCode(possibleCode);
  }

  const checkCode = async () => {
    const amount = checkValidCode(code);
    if (amount > 0) {
      const { data, error } = await addMoney(amount);
      if (error) {
        toast.error(error);
      } else {
        toast.success(
          <div className="flex items-center space-x-1">
            <span>Du har lagt til:</span>
            <Icon icon={"fluent-emoji:coin"} /> {amount} mynter!
          </div>
        );
      }
    } else {
      toast.error("Koden er ugyldig", { autoClose: 1000 });
    }
    // Check if code is correct
    // If correct, add money
    // If not, show error message
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <p className="text-xl">Legg inn kode:</p>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => setCode(e.target.value)}
        className="mt-1 size-12 p-2 block w-full border text-black border-gray-300 rounded-md"
        required
      />
      <Button onClick={() => checkCode()} text="Send inn" />
    </div>
  );
};

export default CodePage;
