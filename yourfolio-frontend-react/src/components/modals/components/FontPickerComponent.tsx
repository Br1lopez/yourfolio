import React, { useContext } from "react";
import FontPicker from "font-picker-react";
import { PortfolioContext } from "src/hooks/PortfolioContext";

const FontPickerComponent = () => {
  const { portfolioData } = useContext(PortfolioContext);

  const handleBgColorInputChange = (event: any) => {
    let data = { ...portfolioData.value };
    data.style.fontFamily = event.target.value;
    portfolioData.set(data);
  };

  return (
    <FontPicker
      apiKey="AIzaSyA7-F6PODGUMyfHXyRvfBfZFRlSJcfmiVE"
      activeFontFamily={portfolioData.value.style.fontFamily}
      onChange={handleBgColorInputChange}
    />
  );
};

export default FontPickerComponent;
