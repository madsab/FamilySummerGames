"use client";
import React, { FC } from "react";
import ShopItem from "./organisms/ShopItem";
import Select from "@/app/components/atoms/Select";
import Ulemper from "@/app/utils/disadvantage.json";
import { User } from "@prisma/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import addPurchase, { PurchaseData } from "@/app/actions/addPurchase";
import { toast } from "react-toastify";

interface ShopProps {
  players: User[];
}

const Shop: FC<ShopProps> = ({ players }) => {
  const session = useSession();
  const nullData = {
    type: null,
    text: null,
    to: null,
    from: null,
    price: null,
  };
  const [formData, setFormData] = React.useState<PurchaseData>(nullData);

  if (!session.data?.user) {
    return <div>Loading...</div>;
  }
  const user = session.data.user;

  const buyDisadvantage = async () => {
    const { data, error } = await addPurchase(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success(
        <div className="flex items-center text-sm ">
          <span className="flex items-center">
            Kjøpt &apos;{data?.text}&apos; for <Icon icon={"fluent-emoji:coin"} />
            {data?.price} mynter!
          </span>
        </div>
      );
    }
    setFormData(nullData);
  };
  return (
    <div className="w-full h-5/6">
      <div className="flex flex-wrap h-full p-4 gap-3">
        <ShopItem
          onCancel={() => setFormData(nullData)}
          onConfirm={() => buyDisadvantage()}
          title="Ulemper"
          icon="tabler:alert-triangle"
          description="Kjøp ulemper andre spillere må ha under neste aktivitet"
        >
          <div>
            <div>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                  Type:
                </label>
                <Select
                  title="Ulemper"
                  placeholder="Velg Ulempe"
                  items={Ulemper}
                  onChange={(value) => {
                    setFormData((prevValue) => ({
                      ...prevValue,
                      text: value,
                      type: "ulempe",
                      from: user.email,
                    }));
                    setFormData((prevData) => ({
                      ...prevData,
                      price: Ulemper.find((item) => item.title === value)?.price || 0,
                    }));
                  }}
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
                  Spiller:
                </label>
                <Select
                  title="Spiller"
                  placeholder="Velg Spiller"
                  items={players.map((player) => player.name).filter((player) => player != user.name)}
                  onChange={(value) => setFormData((prevValue) => ({ ...prevValue, to: value + "@fsg.com" }))}
                />
              </fieldset>
              <div className="mt-8 flex items-center space-x-4">
                <p>Sum:</p>
                {formData.price && (
                  <p className="flex items-center">
                    <Icon icon={"fluent-emoji:coin"} /> {formData.price}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ShopItem>
        <ShopItem
          onCancel={() => setFormData(nullData)}
          onConfirm={() => null}
          title="Hint"
          description="Kjøp hint til neste spill"
        >
          <div>
            <div>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <p>Hint here</p>
              </fieldset>
              <div className="mt-8 flex items-center space-x-4">
                <p>Sum:</p>
                {formData.price && (
                  <p className="flex items-center">
                    <Icon icon={"fluent-emoji:coin"} /> {formData.price}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ShopItem>
        <ShopItem
          onCancel={() => setFormData(nullData)}
          onConfirm={() => null}
          title="Kjøp spiller"
          description="lorem"
        />
      </div>
    </div>
  );
};

export default Shop;
