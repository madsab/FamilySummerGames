"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const session = useSession();
  if (session.data?.user) {
    router.push("/");
  }

  const signin = async () => {
    setLoading(true);
    signIn("credentials", {
      email: name + "@fsg.com",
      password: "password",
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        setError("Finner ikke bruker, prøv igjen.");
        setLoading(false);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-4xl font-bold mb-4">Logg In</h2>
      <div className="space-y-8 text-black flex flex-col items-center">
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
        <Button onClick={signin} loading={loading}>
          Logg inn
        </Button>
        <div className="w-full text-center">
          <Link href="/signup" className="text-red-200 ">
            Ingen bruker?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
