"use client";
import React, { FC, useState } from "react";
import Select from "./atoms/Select";
import Button from "./atoms/Button";
import { Hint } from "@/types/hint";
import setHint from "../actions/setHint";

interface D_HintProps {
  hints: Hint[];
}
const D_Hint: FC<D_HintProps> = ({ hints }) => {
  const [activeHint, setActiveHint] = useState<string | null>();

  return (
    <div className="border-2 p-4 rounded-md w-2/3 space-y-4 ">
      <p>Nåværende hint</p>
      <div className="flex items-center space-x-3">
        <Select
          title="Hint"
          defaultValue={hints.filter((hint) => hint.active === true)[0].game}
          placeholder="Herasdsaad"
          items={hints?.map((hint) => hint.game)}
          onChange={(value) => setActiveHint(value)}
        />
        {activeHint && (
          <Button
            className="text-sm"
            text="Confirm"
            onClick={() => {
              setHint(activeHint);
              setActiveHint(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default D_Hint;
