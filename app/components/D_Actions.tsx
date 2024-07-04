"use client";
import { Input } from "@mui/material";
import React, { useState } from "react";
import ShopItem from "./organisms/ShopItem";
import { Hint } from "@prisma/client";
import { toast } from "react-toastify";
import addHint from "../actions/addHint";

const D_Actions = () => {
  const [hintData, setHintData] = useState<Partial<Hint>>();
  const handleData = async () => {
    const { data, error } = await addHint(hintData as Hint);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Added " + data?.game);
    }
  };
  return (
    <div className="w-full flex flex-col items-center space-y-3 p-3">
      <p className="semibold text-2xl">Actions</p>
      <div className="w-full flex gap-2">
        <ShopItem
          title="New Hint"
          className="p-4 w-1/2"
          description="Add a hint"
          onCancel={() => null}
          onConfirm={handleData}
        >
          <Input
            className="border-2 rounded-md p-2 bg-white mb-4"
            placeholder="Name of game"
            onChange={(e) => {
              setHintData((prevValue) => ({
                ...prevValue,
                game: e.target.value,
                active: false,
              }));
            }}
          />
          <Input
            className="border-2 rounded-md p-2 bg-white"
            placeholder="Hint"
            onChange={(e) => {
              setHintData((prevValue) => ({
                ...prevValue,
                hint: e.target.value,
              }));
            }}
          />
        </ShopItem>
      </div>
    </div>
  );
};

export default D_Actions;
