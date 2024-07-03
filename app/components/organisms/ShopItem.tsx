import { Icon } from "@iconify/react/dist/iconify.js";
import * as Dialog from "@radix-ui/react-dialog";
import React, { FC } from "react";

interface ShopItemProps {
  title: string;
  icon?: string;
  description: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
  noCloseOnConfirm?: boolean;
  onOpen?: () => void;
}
const ShopItem: FC<ShopItemProps> = ({
  title,
  description,
  children,
  icon,
  onConfirm,
  onCancel,
  onOpen,
  disabled,
  noCloseOnConfirm,
}) => {
  return (
    <Dialog.Root onOpenChange={onOpen}>
      <Dialog.Trigger asChild>
        <button className=" border-2 w-[48%] h-1/3 inline-flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-800 rounded-[4px] gap-1 px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          {icon && <Icon icon={icon} />}
          {title}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">{title}</Dialog.Title>
          <Dialog.Description className="text-gray-400 mt-[10px] mb-5 text-[15px] leading-normal">
            {description}
          </Dialog.Description>
          {children}
          <div className="mt-[25px] flex space-x-2 justify-end">
            <Dialog.Close asChild disabled={disabled}>
              <button
                onClick={onCancel}
                className="bg-red-800 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Avbryt
              </button>
            </Dialog.Close>
            {noCloseOnConfirm ? (
              <button
                onClick={onConfirm}
                className="bg-green-600 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Kjøp
              </button>
            ) : (
              <Dialog.Close asChild disabled={disabled}>
                <button
                  onClick={onConfirm}
                  className="bg-green-600 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Kjøp
                </button>
              </Dialog.Close>
            )}
          </div>
          <Dialog.Close asChild>
            <button
              onClick={onCancel}
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Icon icon={"material-symbols:close"} className="size-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShopItem;
