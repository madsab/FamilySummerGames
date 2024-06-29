"use client";
import React, { FC } from "react";
import Select from "./Select";
import User from "@/types/User";
import Ulemper from "@/app/utils/disadvantage.json";

interface DisadvantagesProps {
  players: User[];
}

const Disadvantages: FC<DisadvantagesProps> = ({ players }) => {
  return (
    <div>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
          Type:
        </label>
        <Select title="Ulemper" placeholder="Velg Ulempe" items={Ulemper} onChange={(value) => null} />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
          Spiller:
        </label>
        <Select
          title="Spiller"
          placeholder="Velg Spiller"
          items={players.map((player) => player.name)}
          onChange={() => null}
        />
      </fieldset>
    </div>
  );
};

export default Disadvantages;
