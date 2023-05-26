import { NavBar } from "./components/navBar/NavBar";
import { useQuery } from "@tanstack/react-query";
import { getElement } from "src/api/elementRequests";
import React, { useContext, useEffect, useState } from "react";
import { ActiveComponent } from "./components/activeComponent/ActiveComponent";
import { PortfolioContext } from "../../hooks/PortfolioContext";
import { InterfaceBar } from "./components/interfaceBar/InterfaceBar";
import "./portfolioCreator.scss";
import { PortfolioStyle } from "./components/PortfolioStyle";
import { applyFont, getElementByIdRecursive } from "src/utils/functions";
import { pushWelcomeNotification } from "src/components/notifications/InfoNotification";
import { useParams } from "react-router-dom";

export const PortfolioCreator = () => {
  const { styleData, activeElementId, toaster } =
    useContext(PortfolioContext);
  //eslint-disable-next-line
  const [navHeight, setNavHeight] = useState<string>("55px");
  const { portfolioId } = useParams();

  const query = useQuery({
    queryKey: ["getPortfolio"],
    queryFn: () => getElement(parseInt(portfolioId || "-1")),
    onSuccess: (data) => {
      styleData.set(data.style);
      applyFont(data.style?.fontFamily || "Open Sans");
    },
  });

  useEffect(() => {
    pushWelcomeNotification(toaster);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {query.data && (
        <div className="root apply-font">
          <PortfolioStyle style={styleData.value || undefined} />
          <InterfaceBar portfolioId={parseInt(portfolioId || "-1")} />
          <div className="portfolio">
            <NavBar portfolio={query.data} height={navHeight} />
            {query.data.elements.length > 0 &&



              (
                <ActiveComponent
                  element={getElementByIdRecursive(
                    activeElementId.value || query.data.elements.find((e) => e.home)?.id || -1,
                    query.data
                  )}
                  height={`calc(100vh - ${navHeight}`}
                />
              )}
          </div>
        </div>
      )}
    </>
  );
};
