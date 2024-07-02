import { CircularProgress, Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <CircularProgress color="inherit" className="size-56 " />
    </div>
  );
};

export default Loading;
