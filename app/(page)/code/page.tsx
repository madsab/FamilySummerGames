"use client";
import addMoney from "@/app/actions/addMoney";
import checkValidCode from "@/app/actions/checkValidCode";
import Button from "@/app/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect } from "react";
import { toast } from "react-toastify";

const CodePage = () => {
  const [code, setCode] = React.useState("");
  const params = useSearchParams();
  let counter = 0;

  useEffect(() => {
    const code = params.get("code");

    if (code && counter === 0) {
      checkCode(code);
      counter++;
    }
  }, []);

  const checkCode = async (customCode?: string) => {
    const amount = customCode ? checkValidCode(customCode) : checkValidCode(code);
    if (amount > 0) {
      const { data, error } = await addMoney(amount);
      if (error) {
        toast.error(error);
      } else {
        console.log(data);
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
  };

  return (
    <div className="h-4/5 flex flex-col justify-center items-center space-y-4">
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
