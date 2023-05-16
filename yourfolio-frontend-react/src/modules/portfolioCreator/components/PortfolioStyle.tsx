import React, { useContext } from "react";
import { useEffect } from "react";
import { PortfolioContext } from "../../../hooks/PortfolioContext";

const PortfolioStyle = () => {
  const { portfolioData } = useContext(PortfolioContext);
  const setStyle = (property: string, value: string) => {
    document.documentElement?.style.setProperty(property, value);
  };

  useEffect(() => {
    setStyle("--bg-color", portfolioData.value.style?.bgColor || "black");
    setStyle("--text-color", portfolioData.value.style?.fontColor || "white");
  });

  return <div style={{ display: "none" }}>PortfolioStyle</div>;
};

export default PortfolioStyle;
