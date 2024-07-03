"use client";
import React from "react";
import Button from "./atoms/Button";
import deletePurchase from "../actions/deletePurchase";
import { toast } from "react-toastify";
import AlertDialog from "./organisms/AlertDialog";

const D_Notfication = () => {
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
      <p>Notifications</p>
      <AlertDialog title="Are you sure?" description="This will delete all purchases ever made" onClick={handleDelete}>
        Delete all notifications
      </AlertDialog>
    </div>
  );
};

export default D_Notfication;
