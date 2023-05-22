import React, { useContext } from "react";
import { useEffect } from "react";
import { StyleDTO } from "src/types/dtoTypes";

export interface PortfolioStyleProps {
  style?: StyleDTO;
}

function hexToRgba(hex: string, alpha: number): string {
  hex = hex.replace("#", "");
  // Convert hex to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Create RGBA string from RGB values and alpha
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToLuminance(hex: string): number {
  hex = hex.replace("#", "");

  // Convert hex to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate relative luminance using the formula from WCAG 2.0
  const rsrgb = r / 255;
  const gsrgb = g / 255;
  const bsrgb = b / 255;

  const rl =
    rsrgb <= 0.03928 ? rsrgb / 12.92 : ((rsrgb + 0.055) / 1.055) ** 2.4;
  const gl =
    gsrgb <= 0.03928 ? gsrgb / 12.92 : ((gsrgb + 0.055) / 1.055) ** 2.4;
  const bl =
    bsrgb <= 0.03928 ? bsrgb / 12.92 : ((bsrgb + 0.055) / 1.055) ** 2.4;

  const luminance = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;

  return luminance;
}

export const PortfolioStyle = (props: PortfolioStyleProps) => {
  const setStyle = (property: string, value: string) => {
    document.documentElement?.style.setProperty(property, value);
  };

  useEffect(() => {
    if (props.style) {
      setStyle("--bg-color", props.style.bgColor || "black");
      setStyle(
        "--bg-color-light",
        hexToRgba(props.style.bgColor || "black", 0.1)
      );
      // setStyle("--card-bg", `rgba(255,255,255,${0.15 + hexToLuminance(props.style.bgColor || "black") * 0.85})`);
      setStyle("--font-color", props.style.fontColor || "white");
      setStyle(
        "--font-color-titles",
        hexToLuminance(props.style.fontColor || "white") > 0.6
          ? "black"
          : props.style.fontColor || "white"
      );
    }
  }, [props.style]);

  return <div style={{ display: "none" }}>PortfolioStyle</div>;
};
