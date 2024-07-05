"use client";
import { Input } from "@mui/material";
import React, { useState } from "react";
import ShopItem from "./organisms/ShopItem";
import { Hint } from "@prisma/client";
import { toast } from "react-toastify";
import addHint from "../actions/addHint";
import AddHint from "./organisms/AddHint";
import Refund from "./organisms/Refund";

const D_Actions = () => {
  return (
    <div className="w-full flex flex-col items-center space-y-3 p-3">
      <p className="semibold text-2xl">Actions</p>
      <div className="w-full flex gap-2">
        <AddHint />
        <Refund />
      </div>
    </div>
  );
};

export default D_Actions;
