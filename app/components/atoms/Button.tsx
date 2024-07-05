"use client";
import React, { FC, useState } from "react";
import cn from "classnames";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}
const Button: FC<ButtonProps> = ({ onClick, className, loading, children }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      type="button"
      disabled={loading}
      className={cn(
        "rounded bg-indigo-600 px-4 py-3 flex justify-center text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        className
      )}
    >
      {loading ? <CircularProgress color="inherit" size={25} /> : children}
    </button>
  );
};

export default Button;
