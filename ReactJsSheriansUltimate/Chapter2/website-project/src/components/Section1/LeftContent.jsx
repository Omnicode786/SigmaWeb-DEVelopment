import React from "react";
import HeroText from './HeroText';
import Arrow from "./Arrow";

const LeftContent = () => {
  return (
    <div className="h-full flex flex-col justify-between p-2 w-full md:w-1/2 animate-fadeIn">
      <HeroText />
      <Arrow />
    </div>
  );
};

export default LeftContent;
