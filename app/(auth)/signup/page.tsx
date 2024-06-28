"use client";
import React, { useState } from "react";
import Select from "../components/Select";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.config";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    createUserWithEmailAndPassword(auth, name + "@fsg.com", "password");
    console.log("Name:", name);
    console.log("Family Name:", familyName);
  };

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-4">Registrer deg</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label htmlFor="name" className="block text-sm font-medium ">
            Ditt fornavn:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="familyName" className="block text-sm font-medium">
            Hvilken famile tilhører du?:
          </label>
          <Select
            title="Familie"
            items={["Saudland", "Bårnes", "Skråning"]}
            onChange={(value) => setFamilyName(value)}
          />
        </div>
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
