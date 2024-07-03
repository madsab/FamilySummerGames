"use server";
import { checkUser } from "@/lib/checkUser";
import { List, ListItem } from "@mui/material";
import React from "react";
import getNotifications from "../actions/getNotifications";
import { redirect } from "next/navigation";

const Notifications = async () => {
  const { user } = await checkUser();
  if (!user) {
    redirect("/signin");
  }
  const { notifications } = await getNotifications(user);
  console.log(notifications);
  return (
    <List>
      {notifications?.map((n) => (
        <ListItem key={n.id}>
          <h3>{n.type}</h3>
          <p>{n.price}</p>
        </ListItem>
      ))}
    </List>
  );
};

export default Notifications;
