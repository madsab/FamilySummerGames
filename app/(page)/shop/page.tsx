import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Shop from "../../components/Shop";
import getUserBalance from "@/app/actions/getUserBalance";
import getAllUsers from "@/app/actions/getAllUsers";
import getHint from "@/app/actions/getHint";
import getDisadvantages from "@/app/actions/getDisadvantages";

const ShopPage = async () => {
  const { balance, error } = await getUserBalance();
  const { data } = await getAllUsers();
  const { hint } = await getHint(true);
  const { dis } = await getDisadvantages();
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="h-full w-full">
      <div className="mx-5 flex flex-col items-center">
        <p className="text-2xl">Butikk</p>
        <hr className="text-white w-full h-1" />
      </div>
      <div className="mt-3 flex justify-center items-center">
        <Icon icon={"fluent-emoji:coin"} className="size-8" />
        <p>:{balance ?? 0}</p>
      </div>
      <Shop players={data || []} hint={hint?.[0]} disadvantage={dis || []} />
    </div>
  );
};

export default ShopPage;
