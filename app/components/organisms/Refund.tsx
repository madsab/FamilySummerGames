import Input from "@mui/material/Input";
import React, { useState } from "react";
import ShopItem from "./ShopItem";
import Select from "../atoms/Select";
import getAllUsers from "@/app/actions/getAllUsers";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import getPurchases from "@/app/actions/getPurchases";
import { PurchaseData } from "@/app/actions/addPurchase";
import addMoney from "@/app/actions/addMoney";
import deletePurchase from "@/app/actions/deletePurchase";

const Refund = () => {
  const [refundData, setRefundData] = useState<{
    userEmail?: string;
    purchase?: PurchaseData;
  }>();
  const [users, setUsers] = useState<User[]>();
  const [allPurchases, setAllPurchases] = useState<PurchaseData[]>();

  const handleClick = async () => {
    if (!refundData?.userEmail || !refundData?.purchase) {
      toast.error("Please select a user and a purchase");
      return;
    }
    const isDeleted = await deletePurchase(refundData.purchase.id);
    const { error } = await addMoney(refundData.purchase?.price, refundData.purchase?.from);
    if (error || !isDeleted) {
      toast.error(error);
    } else {
      toast.success("Refunded successfully!");
    }
  };

  const getUsers = async () => {
    const { data, error } = await getAllUsers();
    if (error) {
      toast.error(error);
    } else {
      setUsers(data);
    }
  };

  const getPurchase = async (userEmail?: string) => {
    const { purchases, error } = await getPurchases(userEmail || "");
    if (error) {
      toast.error(error);
    } else {
      setAllPurchases(purchases);
    }
  };
  return (
    <ShopItem
      onOpen={() => getUsers()}
      confirmTitle="Refund"
      title="New Refund"
      className="p-4 w-1/2"
      description="Give a refund to a users purchase."
      onCancel={() => null}
      onConfirm={handleClick}
    >
      <div className="flex flex-col w-2/3 gap-2">
        <Select
          title="User"
          placeholder="Select a user"
          items={users?.map((user) => user.name) || []}
          onChange={(value) => {
            setRefundData((prevValue) => ({
              ...prevValue,
              userEmail: value + "@fsg.com",
            }));
            getPurchase(value + "@fsg.com");
          }}
        />
        {refundData?.userEmail && (
          <Select
            title="Purchases"
            placeholder="Select a purchase"
            className="overflow-hidden"
            items={
              allPurchases?.map(
                (purchase) =>
                  `'${purchase.text}' -> ${purchase.to?.split("@")[0]} (${purchase.createdAt?.toLocaleDateString()})`
              ) || []
            }
            onChange={(value) => {
              setRefundData((prevValue) => ({
                ...prevValue,
                purchase: allPurchases?.find(
                  (purchase) =>
                    `'${purchase.text}' -> ${
                      purchase.to?.split("@")[0]
                    } (${purchase.createdAt?.toLocaleDateString()})` === value
                ),
              }));
            }}
          />
        )}
      </div>
    </ShopItem>
  );
};

export default Refund;
