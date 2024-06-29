import React, { useState } from "react";
import ShopItem from "../../components/ShopItem";
import Select from "@/app/components/Select";
import Ulemper from "@/app/utils/disadvantage.json";
import { getAllUsers } from "@/lib/db/db";
import Disadvantages from "@/app/components/Disadvantages";
import { User, Role } from "@prisma/client";

const Shop = async () => {
  const players = (await getAllUsers()) as User[];

  return (
    <div className="w-full h-5/6">
      <div className="flex flex-wrap h-full p-4 gap-3">
        <ShopItem
          title="Ulemper"
          icon="tabler:alert-triangle"
          description="Kjøp ulemper andre spillere må ha under neste aktivitet"
        >
          <Disadvantages players={players} />
        </ShopItem>
        <ShopItem title="Hint" description="lorem" />
        <ShopItem title="Kjøp spiller" description="lorem" />
      </div>
    </div>
  );
};

export default Shop;
