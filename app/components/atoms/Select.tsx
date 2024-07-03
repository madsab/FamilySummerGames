import React, { FC, Ref } from "react";
import * as SelectR from "@radix-ui/react-select";
import classnames from "classnames";
import { Icon } from "@iconify/react/dist/iconify.js";
import cn from "classnames";

interface SelectProps {
  className?: string;
  title: string;
  groups?: string[];
  items:
    | {
        group?: string;
        title: string;
        price?: number;
      }[]
    | string[];
  placeholder?: string;
  onChange: (value: string) => void;
  onTriggerClick?: () => void;
  defaultValue?: string;
}

const Select: FC<SelectProps> = (props) => (
  <SelectR.Root
    onValueChange={(value) => props.onChange(value)}
    onOpenChange={props.onTriggerClick}
    defaultValue={props.defaultValue}
  >
    <SelectR.Trigger
      className={cn(
        "inline-flex items-center justify-center rounded px-[15px] text-[17px] leading-none h-[45px] gap-[5px] bg-white text-black shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-black outline-none",
        props.className
      )}
      aria-label="Family"
    >
      <SelectR.Value placeholder={props.placeholder} />
      <SelectR.Icon className="text-black">
        <Icon icon={"tabler:chevron-down"} />
      </SelectR.Icon>
    </SelectR.Trigger>
    <SelectR.Portal>
      <SelectR.Content
        aria-modal
        className="z-10 overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      >
        <SelectR.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-black cursor-default">
          <Icon icon={"tabler:chevron-up"} />
        </SelectR.ScrollUpButton>
        <SelectR.Viewport className="p-[5px]">
          {props.groups ? (
            props.groups.map((group) => (
              <SelectR.Group key={group} className="space-y-3 py-3">
                <SelectR.Label className="px-[25px] text-sm leading-[25px] text-red-300 underline">
                  {group}
                </SelectR.Label>
                {!isStringArray(props.items)
                  ? props.items
                      .filter((item) => item.group === group)
                      .map((item) => (
                        <SelectItem key={item.title} value={item.title} price={item.price}>
                          <span className="flex">{item.title}</span>
                        </SelectItem>
                      ))
                  : props.items.map((item) => {
                      console.log("Kom hit for en stund siden");
                      return (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      );
                    })}
              </SelectR.Group>
            ))
          ) : (
            <SelectR.Group className="space-y-3 py-3">
              <SelectR.Label className="px-[25px] text-lg leading-[25px] text-red-300 underline">
                {props.title}
              </SelectR.Label>
              {isStringArray(props.items)
                ? props.items.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))
                : props.items.map((item) => (
                    <SelectItem key={item.title} value={item.title} price={item.price}>
                      <span className="flex">{item.title}</span>
                    </SelectItem>
                  ))}
            </SelectR.Group>
          )}
        </SelectR.Viewport>
        <SelectR.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-black cursor-default">
          <Icon icon={"tabler:chevron-down"} />
        </SelectR.ScrollDownButton>
      </SelectR.Content>
    </SelectR.Portal>
  </SelectR.Root>
);

type SelectItemProps = {
  className?: string;
  children: React.ReactNode;
  value: string;
  price?: number;
};

const SelectItem = React.forwardRef(
  ({ children, className, price, ...props }: SelectItemProps, forwardedRef: Ref<HTMLDivElement> | null) => {
    return (
      <SelectR.Item
        className={classnames(
          "text-[15px] leading-none text-black rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <SelectR.ItemText>{children}</SelectR.ItemText>
        {price && (
          <SelectR.Label className="text-[14px] leading-none text-black flex">
            {" ("}
            <Icon icon={"fluent-emoji:coin"} />
            {price}
            {")"}
          </SelectR.Label>
        )}
        <SelectR.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <Icon icon={"tabler:check"} />
        </SelectR.ItemIndicator>
      </SelectR.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

function isStringArray(value: any): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export default Select;
