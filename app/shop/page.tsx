import React from "react";
import ShopItem from "../components/ShopItem";

const ShopPage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-evenly items-center">
      <ShopItem title="Hint" description="lorem" shopitems={[{ id: 1, name: "somtehing", price: 2000 }]} />
      <ShopItem title="Hint" description="lorem" shopitems={[{ id: 1, name: "somtehing", price: 2000 }]} />
    </div>
  );
};

export default ShopPage;
