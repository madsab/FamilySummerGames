import React from "react";
import rules from "@/app/utils/rules.json";

const Rules = () => {
  return (
    <div className="text-center space-y-2 mx-2">
      <p className="text-2xl">Regler</p>
      {rules.map((rule) => (
        <p key={rule}>{rule}</p>
      ))}
    </div>
  );
};

export default Rules;
