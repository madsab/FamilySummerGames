"use client";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("name:", name);
  };

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Navn:
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
