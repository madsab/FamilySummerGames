"use server";
import { checkUser } from "@/lib/checkUser";
import { List, ListItem, ListItemIcon } from "@mui/material";
import React from "react";
import getNotifications from "../actions/getNotifications";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const Notifications = async () => {
  const { user } = await checkUser();
  if (!user) {
    redirect("/signin");
  }
  const { notifications } = await getNotifications(user);

  return (
    <List className="space-y-3">
      {notifications?.map((n) => (
        <ListItem
          key={n.id}
          className="text-md p-4 border border-red-900 rounded-md bg-red-400 text-red-800 opacity-0 first:opacity-100 duration-1000 delay-300 ease-in-out"
        >
          <Icon icon={"mingcute:notification-line"} className="size-5 animate-pulse" />
          Noen har {n.type === "ulempe" ? "kjøpt en ulempe til " : "kjøpt en spiller fra"} en i familien.
        </ListItem>
      ))}
    </List>
  );
};

export default Notifications;
