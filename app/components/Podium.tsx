"use client";
import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PodiumProps {
  first: {
    name: string;
    score: number | string;
  };
  second: {
    name: string;
    score: number | string;
  };
  third: {
    name: string;
    score: number | string;
  };
}

const Podium: FC<PodiumProps> = ({ first, second, third }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Use setTimeout to delay the animation start
    setTimeout(() => {
      setMounted(true);
    }, 100); // Adjust the delay as needed
  }, []);
  return (
    <div
      className={cn(
        "flex justify-center items-end space-x-4 mt-10",
        mounted ? "translate-y-0 duration-500" : "translate-y-40"
      )}
    >
      <div className="flex flex-col justify-end items-center">
        <div
          className={`bg-gray-400 w-24 flex flex-col justify-center items-center text-white transform shadow-lg ${
            mounted ? "h-32  duration-500" : "h-0"
          }`}
        >
          <div className={`text-xl font-bold ${mounted ? "visible transition-all" : "hidden"}`}>2nd</div>
          <div className={`text-lg ${mounted ? "visible duration-1000" : "hidden"}`}>{second.name}</div>
          <div className={`text-sm flex items-center ${mounted ? "visible duration-1000" : "hidden"}`}>
            <Icon icon={"fluent-emoji:coin"} />
            {second.score}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center">
        <div
          className={`bg-yellow-500 w-24 flex flex-col justify-center items-center text-white transform shadow-lg ${
            mounted ? "h-40 duration-500" : "h-0"
          }`}
        >
          <div className={`text-xl font-bold ${mounted ? "visible duration-1000" : "hidden"}`}>1st</div>
          <div className={`text-lg ${mounted ? "visible duration-1000" : "hidden"}`}>{first.name}</div>
          <div className={`text-sm flex items-center ${mounted ? "visible duration-1000" : "hidden"}`}>
            <Icon icon={"fluent-emoji:coin"} />
            {first.score}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center">
        <div
          className={`bg-gray-600 w-24 flex flex-col justify-center items-center text-white transform shadow-lg ${
            mounted ? "h-28 duration-500" : "h-0"
          }`}
        >
          <div className={`text-xl font-bold ${mounted ? "visible duration-1000" : "hidden"}`}>3rd</div>
          <div className={`text-lg ${mounted ? "visible duration-1000" : "hidden"}`}>{third.name}</div>
          <div className={`text-sm flex items-center ${mounted ? "visible duration-1000" : "hidden"}`}>
            <Icon icon={"fluent-emoji:coin"} />
            {third.score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
