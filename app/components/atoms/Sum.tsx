import currencyFormat from "@/app/utils/currencyFormat";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { FC } from "react";

interface SumProps {
  sum: number;
}
const Sum: FC<SumProps> = ({ sum }) => {
  return (
    <div className="mt-8 flex items-center space-x-4">
      <p>Sum:</p>
      <p className="flex items-center">
        <Icon icon={"fluent-emoji:coin"} /> {currencyFormat(sum)}
      </p>
    </div>
  );
};

export default Sum;
