import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getElement } from "../../api/element";
import React, { useContext, useEffect, useState } from "react";
import ActiveComponent from "./components/activeComponent/ActiveComponent";
import { getElementByIdRecursive } from "../../utils/functions";
import { PortfolioContext } from "./context/PortfolioContext";
import InterfaceFooter from "./components/interfaceFooter/InterfaceFooter";
import { Notification } from "rsuite";
import InterfaceBar from "./components/interfaceBar/InterfaceBar";
import './pageCreator.scss'

export interface PageCreatorProps {
  portfolioId: number;
}

export const PageCreator = (props: PageCreatorProps) => {
  const { portfolioId, activeElementId } = useContext(PortfolioContext);
  const [barWidth, useBarWidth] = useState<string>("55px")

  useEffect(() => {
    portfolioId.set(props.portfolioId);
  }, []);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["getElement", props.portfolioId],
    queryFn: () => getElement(props.portfolioId),
  });

  return (
    <>
      <DefaultHead></DefaultHead>
      {query.data && (
        <div className="root">
          <InterfaceBar width={barWidth}/>
          <div className="content" style={{width: `calc(100vw - ${barWidth})`}}>
            <NavBar
              title={query.data.name}
              tabs={query.data.elements
                .sort((a: any, b: any) => a.position - b.position)
                .map((tab: any) => ({ name: tab.name, id: tab.id }))}
            />
            {query.data.elements.length > 0 && (
              <ActiveComponent
                data={getElementByIdRecursive(
                  activeElementId.value,
                  query.data
                )}
              />
            )}
            {/* <InterfaceFooter /> */}
          </div>
        </div>
      )}
    </>
  );
};
