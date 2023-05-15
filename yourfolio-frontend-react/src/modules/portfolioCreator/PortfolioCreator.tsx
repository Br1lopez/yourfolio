import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery } from "@tanstack/react-query";
import { getElement } from "src/api/element";
import React, { useContext, useEffect, useState } from "react";
import { ActiveComponent } from "./components/activeComponent/ActiveComponent";
import { PortfolioContext } from "./context/PortfolioContext";
import InterfaceBar from "./components/interfaceBar/InterfaceBar";
import "./portfolioCreator.scss";
import PortfolioStyle from "./components/PortfolioStyle";
import { applyFont, getElementByIdRecursive } from "src/utils/functions";
import { ModalWindow } from "./components/modals/TabModal";

export interface PortfolioCreatorProps {
  portfolioId: number;
}

export const PortfolioCreator = (props: PortfolioCreatorProps) => {
  const { portfolioId, portfolioData, activeElementId, activeModalData } =
    useContext(PortfolioContext);
  //eslint-disable-next-line
  const [barWidth, setBarWidth] = useState<string>("55px");
  //eslint-disable-next-line
  const [navHeight, setNavHeight] = useState<string>("55px");

  useEffect(() => {
    portfolioId.set(props.portfolioId);
  }, [portfolioId, props.portfolioId]);

  useEffect(() => {
    console.log("ctx", activeModalData.value);
  }, [activeModalData]);

  const query = useQuery({
    queryKey: ["getElement", props.portfolioId],
    queryFn: () => getElement(props.portfolioId),
    onSuccess: (data) => {
      portfolioData.set(data);
      applyFont(data.style.fontFamily || "Open Sans");
    },
  });

  return (
    <>
      <DefaultHead></DefaultHead>
      {query.data && (
        <div className="root apply-font">
          <PortfolioStyle />
          <InterfaceBar width={barWidth} />
          <div
            className="portfolio"
            style={{
              width: `calc(100vw - ${barWidth})`,
            }}
          >
            <NavBar portfolio={query.data} height={navHeight} />
            {query.data.elements.length > 0 && (
              <ActiveComponent
                element={getElementByIdRecursive(
                  activeElementId.value,
                  portfolioData.value
                )}
                height={`calc(100vh - ${navHeight}`}
              />
            )}
          </div>
          <ModalWindow modalProperties={activeModalData.value} />
        </div>
      )}
    </>
  );
};
