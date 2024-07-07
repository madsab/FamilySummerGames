import Image from "next/image";
import React from "react";
import Endre from "@/app/(page)/img/Endre.png";

const EndreLoading = () => {
  return <Image src={Endre} alt="Picture of Endre" className=" z-10 animate-spin" />;
};

export default EndreLoading;
