import React, { useContext } from "react";
import { useEffect } from "react";
import { PortfolioContext } from "../../../hooks/PortfolioContext";
import { StyleDTO } from "src/types/dtoTypes";

export interface PortfolioStyleProps {
  style?: StyleDTO;
}

export const PortfolioStyle = (props: PortfolioStyleProps) => {

  const setStyle = (property: string, value: string) => {
    document.documentElement?.style.setProperty(property, value);
  };

  useEffect(() => {
    if (props.style) {
      setStyle("--bg-color", props.style.bgColor || "black");
      setStyle("--font-color", props.style.fontColor || "white");
    }
  }, [props.style]);

  return <div style={{ display: "none" }}>PortfolioStyle</div>;
};
