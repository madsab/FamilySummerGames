"use client";
import addMoney from "@/app/actions/addMoney";
import checkValidCode from "@/app/actions/checkValidCode";
import Button from "@/app/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const CodePage = () => {
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const params = useSearchParams();
  let counter = 0;

  useEffect(() => {
    const code = params.get("code");
    setLoading(false);

    if (code && counter === 0) {
      checkCode(code);
      counter++;
    }
  }, []);

  const checkCode = async (customCode?: string) => {
    setLoading(true);
    const amount = customCode ? await checkValidCode(customCode) : await checkValidCode(code);
    if (amount > 0) {
      const { error } = await addMoney(amount);
      if (error) {
        setLoading(false);
        toast.error(error);
      } else {
        setCode("");
        toast.success(
          <div className="flex items-center space-x-1">
            <span>Du har lagt til:</span>
            <Icon icon={"fluent-emoji:coin"} /> {amount} mynter!
          </div>
        );
        setLoading(false);
      }
    } else {
      if (amount < 0) {
        toast.error("Koden er allerede brukt", { autoClose: 1000 });
      } else {
        toast.error("Koden er ugyldig", { autoClose: 1000 });
      }
      setLoading(false);
    }
  };

  return (
    <div className="h-4/5 flex flex-col justify-center items-center space-y-4">
      <p className="text-xl">Legg inn kode:</p>
      <input
        type="text"
        id="name"
        name="name"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mt-1 size-12 p-2 block w-full border text-black border-gray-300 rounded-md"
        required
      />
      <Button onClick={() => checkCode()} loading={loading} text="Send inn" />
    </div>
  );
};

export default CodePage;
