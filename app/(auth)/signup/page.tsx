"use client";
import React, { useState } from "react";
import Select from "../../components/atoms/Select";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Button from "@/app/components/atoms/Button";

const SignupPage: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    name: "",
    familyName: "",
    money: 100000,
  });
  const session = useSession();
  if (session.data?.user) {
    redirect("/");
  }
  const registerUser = async () => {
    setLoading(true);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const { error } = await response.json();
    if (error) {
      setLoading(false);
      setError(error);
      return;
    }
    signIn("credentials", {
      email: data.email,
      password: "password",
      callbackUrl: "/",
    });
  };

  return (
    <div className="container mx-auto max-w-md flex flex-col items-center space-y-4">
      <h2 className="text-4xl font-bold mb-4">Registrer deg</h2>
      <div>
        <label htmlFor="name" className="block text-lg font-medium ">
          Ditt fornavn:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={(e) =>
            setData({
              email: e.target.value + "@fsg.com",
              name: e.target.value,
              familyName: data.familyName,
              money: data.money,
            })
          }
          className="mt-1 size-12 p-4 block w-full border border-gray-300 rounded-md text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="familyName" className="block text-lg font-medium">
          Hvilken famile tilhører du?:
        </label>
        <Select
          className="size-12 w-full"
          title="Familie"
          items={["Saudland", "Bårnes", "Skråning"]}
          placeholder="Velg en familie"
          onChange={(value) => setData({ email: data.email, name: data.name, familyName: value, money: data.money })}
        />
      </div>
      {error && <p className="text-red-500 text-sm w-[200px] text-center border-2">{error}</p>}
      <Button onClick={() => registerUser()} text="Registrer" loading={loading} />
    </div>
  );
};

export default SignupPage;
