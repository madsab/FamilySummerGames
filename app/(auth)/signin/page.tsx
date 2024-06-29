"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const signin = async () => {
    signIn("credentials", {
      email: name + "@fsg.com",
      password: "password",
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        setError("Finner ikke bruker, prøv igjen.");
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-4xl font-bold mb-4">Logg In</h2>
      <div className="space-y-8 text-black">
        <div>
          <label htmlFor="name" className="block text-lg font-medium ">
            Navn:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 size-12 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm w-[200px] text-center ">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 size-12 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          onClick={signin}
        >
          Logg In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
