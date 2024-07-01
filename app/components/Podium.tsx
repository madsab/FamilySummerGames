"use client";
import { FC, useEffect, useState } from "react";

interface PodiumProps {
  first: string;
  second: string;
  third: string;
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
    <div className="flex justify-center items-end space-x-4 mt-10">
      <div className="flex flex-col justify-end items-center">
        <div
          className={`bg-gray-400 w-24 flex flex-col justify-center items-center text-white transform shadow-lg ${
            mounted ? "h-40  duration-500" : "h-0"
          }`}
        >
          <div className={`text-xl font-bold ${mounted ? "visible duration-700" : "hidden"}`}>2nd</div>
          <div className={`text-lg ${mounted ? "visible duration-700" : "hidden"}`}>{second}</div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center">
        <div
          className={`bg-yellow-500 w-24 flex flex-col justify-center items-center text-white transform shadow-lg ${
            mounted ? "h-48 duration-500" : "h-0"
          }`}
        >
          <div className={`text-xl font-bold ${mounted ? "visible duration-700" : "hidden"}`}>1st</div>
          <div className={`text-lg ${mounted ? "visible duration-700" : "hidden"}`}>{first}</div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center">
        <div
          className={`bg-gray-600 w-24 flex flex-col justify-center items-center text-white transform shadow-lg ${
            mounted ? "h-32 duration-500" : "h-0"
          }`}
        >
          <div className={`text-xl font-bold ${mounted ? "visible duration-700" : "hidden"}`}>3rd</div>
          <div className={`text-lg ${mounted ? "visible duration-700" : "hidden"}`}>{third}</div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
