import React, { useContext } from "react";
import FontPicker from "font-picker-react";
import { PortfolioContext } from "src/hooks/PortfolioContext";

const FontPickerComponent = () => {
  const { styleData } = useContext(PortfolioContext);

  const handleBgColorInputChange = (event: any) => {
    styleData.set({ ...styleData.value, fontFamily: event.target.value });
  }

  return (
    <FontPicker
      apiKey="AIzaSyA7-F6PODGUMyfHXyRvfBfZFRlSJcfmiVE"
      activeFontFamily={styleData.value?.fontFamily}
      onChange={handleBgColorInputChange}
    />
  );
};

export default FontPickerComponent;
