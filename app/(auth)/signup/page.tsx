"use client";
import React, { useState } from "react";
import Select from "../../components/Select";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignupPage: React.FC = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    name: "",
    familyName: "",
    money: 100000,
  });

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const userInfo = await response.json();
    console.log(userInfo);
    if (response.status != 201) {
      setError("Brukeren finnes allerede, prøv igjen");
      return;
    }
    signIn("credentials", {
      email: data.email,
      password: "password",
      callbackUrl: "/",
    });
  };

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-4xl font-bold mb-4">Registrer deg</h2>
      <form onSubmit={registerUser} className="space-y-8 text-black">
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
            className="mt-1 size-12 p-4 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="familyName" className="block text-lg font-medium">
            Hvilken famile tilhører du?:
          </label>
          <Select
            className="mb-12 size-12 w-full"
            title="Familie"
            items={["Saudland", "Bårnes", "Skråning"]}
            placeholder="Velg en familie"
            onChange={(value) => setData({ email: data.email, name: data.name, familyName: value, money: data.money })}
          />
        </div>
        {error && <p className="text-red-500 text-sm w-[200px] text-center ">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Registrer deg
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
