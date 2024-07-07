"use client";
import { FC, useState } from "react";
import ShopItem from "./organisms/ShopItem";
import Select from "@/app/components/atoms/Select";
import { User } from "@prisma/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import addPurchase, { PurchaseData } from "@/app/actions/addPurchase";
import { toast } from "react-toastify";
import Sum from "./atoms/Sum";
import Hint from "./atoms/Hint";
import { Hint as HintType } from "@prisma/client";
import { Disadvantage } from "@/types/disadvantage";
import { CircularProgress } from "@mui/material";

interface ShopProps {
  players: User[];
  hint?: HintType;
  disadvantage: Disadvantage[];
}

const Shop: FC<ShopProps> = ({ players, hint, disadvantage }) => {
  const session = useSession();
  const nullData = {
    type: null,
    text: null,
    to: null,
    from: "",
    price: 0,
    forFamily: null,
  };
  const [formData, setFormData] = useState<PurchaseData>(nullData);
  const [disabled, setDisabled] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!session.data?.user) {
    return <div>No user</div>;
  }
  const user = session.data.user;

  const purchase = async () => {
    setLoading(true);
    const { data, error } = await addPurchase(formData);
    setLoading(false);
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
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-70 bg-black flex justify-center items-center">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div className="h-full p-4 space-y-3">
        <ShopItem
          confirmTitle="Kjøp"
          disabled={disabled}
          onCancel={() => {
            setFormData(nullData);
          }}
          onConfirm={() => purchase()}
          title="Ulemper"
          icon="tabler:alert-triangle"
          description="Kjøp ulemper andre spillere må ha under neste aktivitet"
          className="mr-3"
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
                  items={disadvantage}
                  onChange={(value) => {
                    setFormData((prevValue) => ({
                      ...prevValue,
                      text: value,
                      type: "ulempe",
                      from: user.email,
                      price: disadvantage.find((item) => item.title === value)?.price || 0,
                      area: disadvantage.find((item) => item.title === value)?.area,
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
                    setFormData((prevValue) => ({
                      ...prevValue,
                      to: value + "@fsg.com",
                      forFamily: players.find((player) => player.name === value)?.familyName || null,
                    }));
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
                      setFormData((prevValue) => ({ ...prevValue, extra: ["bindes med " + value] }));
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
          confirmTitle="Kjøp"
          onOpen={() => {
            setFormData((prevValue) => ({
              ...prevValue,
              type: "hint",
              text: "Kjøpt hint: " + hint?.game.toString() || "Ingen hint",
              to: user.email,
              from: user.email,
              price: 50000,
              forFamily: "None",
            }));
          }}
          noCloseOnConfirm
          disabled={disabled}
          onCancel={() => {
            setTimeout(() => setFormData(nullData), 500);
          }}
          onConfirm={() => {
            purchase();
          }}
          title="Hint"
          icon="fluent:lightbulb-20-filled"
          description="Kjøp hint til neste spill. (Har du kjøpt hintet, trykk kjøp for å se det på nytt)"
        >
          <div>
            <div>
              <fieldset className="mb-[15px] flex items-center gap-5 justify-center">
                <Hint flipped={flipped} currentHint={hint} />
              </fieldset>
              <Sum sum={50000} />
            </div>
          </div>
        </ShopItem>
        <ShopItem
          confirmTitle="Kjøp"
          disabled={disabled}
          onCancel={() => setFormData(nullData)}
          onConfirm={() => purchase()}
          title="Kjøp spiller"
          icon="fluent:people-team-20-filled"
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
                  to: user.email,
                  type: "Kjøpe spiller",
                  text: "Har kjøpt spiller " + value,
                  price: 100000,
                  from: user.email,
                  forFamily: players.find((player) => player.name === value)?.familyName || null,
                  area: "other",
                }));
                setTimeout(() => setDisabled(false), 500);
              }}
            />
            {user.name == "Endre" && <p>Ikke gjør noe dumt nå Endre</p>}
          </fieldset>
          <Sum sum={100000} />
        </ShopItem>
      </div>
    </div>
  );
};

export default Shop;
