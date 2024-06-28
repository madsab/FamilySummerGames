import React, { FC, Ref } from "react";
import * as SelectR from "@radix-ui/react-select";
import classnames from "classnames";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SelectProps {
  title: string;
  items: string[];
  onChange: (value: string) => void;
}

const Select: FC<SelectProps> = (props) => (
  <SelectR.Root onValueChange={(value) => props.onChange(value)}>
    <SelectR.Trigger
      className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-black shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-black outline-none"
      aria-label="Food"
    >
      <SelectR.Value placeholder="Velg en familie" />
      <SelectR.Icon className="text-black">
        <Icon icon={"tabler:chevron-down"} />
      </SelectR.Icon>
    </SelectR.Trigger>
    <SelectR.Portal>
      <SelectR.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <SelectR.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-black cursor-default">
          <Icon icon={"tabler:chevron-up"} />
        </SelectR.ScrollUpButton>
        <SelectR.Viewport className="p-[5px]">
          <SelectR.Group>
            <SelectR.Label className="px-[25px] text-xs leading-[25px] text-red-300">{props.title}</SelectR.Label>
            {props.items.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectR.Group>

          <SelectR.Separator className="h-[1px] bg-violet6 m-[5px]" />
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
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: SelectItemProps, forwardedRef: Ref<HTMLDivElement> | null) => {
    return (
      <SelectR.Item
        className={classnames(
          "text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-black data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <SelectR.ItemText>{children}</SelectR.ItemText>
        <SelectR.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <Icon icon={"tabler:check"} />
        </SelectR.ItemIndicator>
      </SelectR.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default Select;
