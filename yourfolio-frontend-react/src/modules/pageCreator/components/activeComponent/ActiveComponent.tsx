import React, { useContext } from "react";
import { PortfolioContext } from "src/modules/pageCreator/PageCreator";

export interface ActiveComponentProps {
  data: any;
}

const ActiveComponent = (props: ActiveComponentProps) => {
  const { activeElementId } = useContext(PortfolioContext);
  return <div>{props.data.name}{activeElementId}</div>;
};

export default ActiveComponent;
