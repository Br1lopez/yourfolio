import React, { useContext } from "react";
import { PortfolioContext } from "src/modules/portfolioCreator/context/PortfolioContext";

export interface ActiveComponentProps {
  data: any;
}

const ActiveComponent = (props: ActiveComponentProps) => {
  const { activeElementId, portfolioId, portfolioData } = useContext(PortfolioContext);
  return <div>{props.data? props.data.name : ""}
  {/* {activeElementId}aaa{portfolioId.portfolioId} */}
  {"aaa " + portfolioData.value.style?.bgColor}
  </div>;
};

export default ActiveComponent;
