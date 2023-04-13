import React, { useContext } from "react";
import { PortfolioContext } from "src/modules/pageCreator/context/PortfolioContext";

export interface ActiveComponentProps {
  data: any;
}

const ActiveComponent = (props: ActiveComponentProps) => {
  const { activeElementId, portfolioId } = useContext(PortfolioContext);
  return <div>{props.data? props.data.name : ""}
  {/* {activeElementId}aaa{portfolioId.portfolioId} */}
  </div>;
};

export default ActiveComponent;
