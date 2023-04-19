import React from "react";
import { useEffect } from "react";

interface PortfolioStyleProps {
  bgColor: string;
  textColor: string;
}

const PortfolioStyle = (props: PortfolioStyleProps) => {
  const setStyle = (property: string, value: string) => {
    document.documentElement?.style.setProperty(property, value);
  };

  useEffect(() => {
    setStyle("--bg-color", props.bgColor);
    setStyle("--text-color", props.textColor);
  });

  return <div style={{ display: "none" }}>PortfolioStyle</div>;
};

export default PortfolioStyle;
