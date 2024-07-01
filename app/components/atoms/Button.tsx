"use client";
import React, { FC } from "react";
import cn from "classnames";

interface ButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
}
const Button: FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "rounded bg-indigo-600 px-4 py-3 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
