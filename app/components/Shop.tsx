"use client";
import { FC, useState } from "react";
import ShopItem from "./organisms/ShopItem";
import Select from "@/app/components/atoms/Select";
import Ulemper from "@/app/utils/disadvantage.json";
import { User } from "@prisma/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import addPurchase, { PurchaseData } from "@/app/actions/addPurchase";
import { toast } from "react-toastify";
import Sum from "./atoms/Sum";
import Hint from "./atoms/Hint";
import { Hint as HintType } from "@/types/hint";

interface ShopProps {
  players: User[];
  hint?: HintType;
}

const Shop: FC<ShopProps> = ({ players, hint }) => {
  const session = useSession();
  const nullData = {
    type: null,
    text: null,
    to: null,
    from: null,
    price: 0,
  };
  const [formData, setFormData] = useState<PurchaseData>(nullData);
  const [disabled, setDisabled] = useState(false);
  const [flipped, setFlipped] = useState(false);

  if (!session.data?.user) {
    return <div>No user</div>;
  }
  const user = session.data.user;

  const purchase = async () => {
    const { data, error } = await addPurchase(formData);

    if (error) {
      toast.error(error);
      if (error.includes("Du har allerede kjøpt dette hintet")) {
        setFlipped(true);
      }
    } else {
      toast.success(
        <div className="flex items-center text-sm ">
          <span className="flex items-center">
            Kjøpt &apos;{formData.type === "hint" ? "Hint" : data?.text}&apos; for <Icon icon={"fluent-emoji:coin"} />
            {data?.price} mynter!
          </span>
        </div>
      );
      if (formData.type === "hint") {
        setFlipped(true);
      }
    }
    setFormData(nullData);
  };
  return (
    <div className="w-full h-5/6">
      <div className="flex flex-wrap h-full p-4 gap-3">
        <ShopItem
          disabled={disabled}
          onCancel={() => setFormData(nullData)}
          onConfirm={() => purchase()}
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
                  onTriggerClick={() => setDisabled(!disabled)}
                  title="Ulemper"
                  placeholder="Velg Ulempe"
                  items={Ulemper}
                  onChange={(value) => {
                    setFormData((prevValue) => ({
                      ...prevValue,
                      text: value,
                      type: "ulempe",
                      from: user.email,
                      price: Ulemper.find((item) => item.title === value)?.price || 0,
                    }));
                    setTimeout(() => setDisabled(false), 500);
                  }}
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
                  Spiller:
                </label>
                <Select
                  onTriggerClick={() => setDisabled(!disabled)}
                  title="Spiller"
                  placeholder="Velg Spiller"
                  groups={players
                    .map((player) => player.familyName)
                    .filter((value, index, self) => self.indexOf(value) === index)}
                  items={players
                    .filter((player) => player.name != user.name)
                    .map((player) => ({ title: player.name, group: player.familyName }))}
                  onChange={(value) => {
                    setFormData((prevValue) => ({ ...prevValue, to: value + "@fsg.com" }));
                    setTimeout(() => setDisabled(false), 500);
                  }}
                />
              </fieldset>
              {formData.text === "Bindet sammen med en annen" && (
                <fieldset className="mb-[15px] flex items-center gap-5">
                  <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
                    Spiller:
                  </label>
                  <Select
                    onTriggerClick={() => setDisabled(!disabled)}
                    title="Spiller"
                    placeholder="Velg Spiller"
                    groups={players
                      .map((player) => player.familyName)
                      .filter((value, index, self) => self.indexOf(value) === index)}
                    items={players
                      .filter((player) => player.name != user.name)
                      .map((player) => ({ title: player.name, group: player.familyName }))}
                    onChange={(value) => {
                      setFormData((prevValue) => ({ ...prevValue, extra: ["Bindes med " + value] }));
                      setTimeout(() => setDisabled(false), 500);
                    }}
                  />
                </fieldset>
              )}
              <Sum sum={formData.price} />
            </div>
          </div>
        </ShopItem>
        <ShopItem
          onOpen={() => {
            setFormData(() => ({
              type: "hint",
              text: hint?.game.toString() || "Ingen hint",
              to: user.email,
              from: user.email,
              price: 10000,
            }));
          }}
          noCloseOnConfirm
          disabled={disabled}
          onCancel={() => setFormData(nullData)}
          onConfirm={() => {
            purchase();
          }}
          title="Hint"
          description="Kjøp hint til neste spill"
        >
          <div>
            <div>
              <fieldset className="mb-[15px] flex items-center gap-5 justify-center">
                <Hint flipped={flipped} currentHint={hint} />
              </fieldset>
              <Sum sum={10000} />
            </div>
          </div>
        </ShopItem>
        <ShopItem
          disabled={disabled}
          onCancel={() => setFormData(nullData)}
          onConfirm={() => purchase()}
          title="Kjøp spiller"
          description="Kjøp en spiller du tjener pengene til under neste spill."
        >
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
              Spiller:
            </label>
            <Select
              onTriggerClick={() => setDisabled(!disabled)}
              title="Spiller"
              placeholder="Velg Spiller"
              groups={players
                .filter((player) => player.familyName != user.familyName)
                .map((player) => player.familyName)
                .filter((value, index, self) => self.indexOf(value) === index)}
              items={players
                .filter((player) => player.name != user.name)
                .map((player) => ({ title: player.name, group: player.familyName }))}
              onChange={(value) => {
                setFormData((prevValue) => ({
                  ...prevValue,
                  to: value + "@fsg.com",
                  type: "Kjøpe spiller",
                  text: "Kjøpt " + value,
                  price: 150000,
                  from: user.email,
                }));
                setTimeout(() => setDisabled(false), 500);
              }}
            />
          </fieldset>
          <Sum sum={formData.price} />
        </ShopItem>
      </div>
    </div>
  );
};

export default Shop;
