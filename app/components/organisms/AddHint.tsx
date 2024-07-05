import addHint from "@/app/actions/addHint";
import { Input } from "@mui/material";
import { Hint } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ShopItem from "./ShopItem";

const AddHint = () => {
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
    <ShopItem
      confirmTitle="Add"
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
  );
};

export default AddHint;
