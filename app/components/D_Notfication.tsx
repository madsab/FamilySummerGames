"use client";
import React, { FC } from "react";
import Button from "./atoms/Button";
import deletePurchase from "../actions/deletePurchase";
import { toast } from "react-toastify";
import AlertDialog from "./organisms/AlertDialog";
import getNotifications from "../actions/getNotifications";
import { Purchase } from "@prisma/client";
import { List, ListItem } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

interface D_NotficationProps {
  notifications: Purchase[];
}
const D_Notfication: FC<D_NotficationProps> = ({ notifications }) => {
  const handleDelete = async () => {
    const isDeleted = await deletePurchase();
    if (isDeleted) {
      toast.success("All purchases deleted");
    } else {
      toast.error("Could not delete purchases");
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-xl">Notifications</p>
      <List className="space-y-2 mx-2">
        {notifications.map((n) => {
          return (
            <ListItem key={n.id} className="text-md p-4 border  rounded-md bg-white text-black">
              <Icon icon={"mingcute:notification-line"} className="size-5" />
              {n.extra[0] ? `${n.text} -> ${n.to.split("@")[0]} ${n.extra[0]}` : `${n.text} -> ${n.to.split("@")[0]}`}
            </ListItem>
          );
        })}
      </List>
      <AlertDialog title="Are you sure?" description="This will delete all purchases ever made" onClick={handleDelete}>
        Delete all notifications
      </AlertDialog>
      <div className="h-20"></div>
    </div>
  );
};

export default D_Notfication;
