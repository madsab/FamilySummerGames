"use client";
import { Hint as HintType } from "@/types/hint";
import { FC } from "react";
import CardFlip from "react-card-flip";

interface HintProps {
  flipped?: boolean;
  currentHint?: HintType;
}
const Hint: FC<HintProps> = ({ flipped, currentHint }) => {
  return (
    <CardFlip isFlipped={flipped} flipDirection="vertical" containerClassName="w-4/5">
      <div className="border-2 px-6 py-4 min-h-32 rounded-md flex justify-center items-center bg-slate-500">Hint</div>
      <div className="border-2 px-6 py-4 min-h-32 rounded-md flex justify-center items-center bg-gradient-to-r from-slate-900 to-slate-800">
        {currentHint ? currentHint.hint : "Ingen hint"}
      </div>
    </CardFlip>
  );
};

export default Hint;
