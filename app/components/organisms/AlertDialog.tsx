import React, { FC } from "react";
import * as AlertDialogR from "@radix-ui/react-alert-dialog";

interface AlertDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  onClick: () => void;
}
const AlertDialog: FC<AlertDialogProps> = ({ children, onClick, title, description }) => {
  return (
    <AlertDialogR.Root>
      <AlertDialogR.Trigger>
        <button className="bg-red-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none  outline-none ">
          {children}
        </button>
      </AlertDialogR.Trigger>
      <AlertDialogR.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialogR.Title className=" text-black m-0 text-[17px] font-medium">{title}</AlertDialogR.Title>
        <AlertDialogR.Description className=" text-slate-600 mt-4 mb-5 text-[15px] leading-normal">
          {description}
        </AlertDialogR.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialogR.Cancel asChild>
            <button className="text-slate-600 bg-slate-400 hover:bg-slate-700  inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancel
            </button>
          </AlertDialogR.Cancel>
          <AlertDialogR.Action asChild onClick={onClick}>
            <button className="text-red-300 bg-red-500 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Yes, delete account
            </button>
          </AlertDialogR.Action>
        </div>
      </AlertDialogR.Content>
    </AlertDialogR.Root>
  );
};

export default AlertDialog;
