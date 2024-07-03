"use client";
import React, { FC, useState } from "react";
import Select from "./atoms/Select";
import Button from "./atoms/Button";
import { Hint } from "@prisma/client";
import setHint from "../actions/setHint";
import { toast } from "react-toastify";

interface D_HintProps {
  hints: Hint[];
}
const D_Hint: FC<D_HintProps> = ({ hints }) => {
  const [activeHint, setActiveHint] = useState<string>("");

  const updateHint = async () => {
    const { error } = await setHint(activeHint);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Hint updated");
    }
  };

  return (
    <div className="border-2 p-4 rounded-md w-2/3 space-y-4 ">
      <p>Nåværende hint i butikken</p>
      <div className="flex items-center space-x-3">
        <Select
          title="Hint"
          defaultValue={hints.filter((hint) => hint.active === true)[0].game}
          items={hints?.map((hint) => hint.game)}
          onChange={(value) => setActiveHint(value)}
        />
        {activeHint && (
          <Button
            className="text-sm"
            text="Confirm"
            onClick={() => {
              updateHint();
              setActiveHint("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default D_Hint;
