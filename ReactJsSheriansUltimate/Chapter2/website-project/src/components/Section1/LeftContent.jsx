import React from "react";
import HeroText from './HeroText';
import Arrow from "./Arrow";
const LeftContent = () => {
  return (
    <div className="h-full flex flex-col justify-between p-2 w-1/2">

<HeroText></HeroText>
    <Arrow></Arrow>
    </div>
  );
};

export default LeftContent;
