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
import { get } from "lodash";
import { getUserInfo } from "src/api/authenticatedUserRequests";

export interface PortfolioCreatorProps {
  editMode?: boolean;
}

export const PortfolioCreator = (props: PortfolioCreatorProps) => {
  const { styleData, activeElementId, toaster, editMode } =
    useContext(PortfolioContext);
  //eslint-disable-next-line
  const [navHeight, setNavHeight] = useState<string>("55px");
  const { portfolioId } = useParams();


  const portfolioQuery = useQuery({
    queryKey: ["getPortfolio"],
    queryFn: () => getElement(parseInt(portfolioId || "-1")),
    onSuccess: (response) => {
      styleData.set(response.data.style);
      applyFont(response.data.style?.fontFamily || "Open Sans");
    },
  });

  const userQuery = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => getUserInfo(),
    onSuccess: (response) => {
      editMode.set((props.editMode || false) && response.id === portfolioQuery.data?.data.user.id);
    },
    enabled: !!portfolioQuery.data
  });

  useEffect(() => {
    pushWelcomeNotification(toaster);

    //eslint-disable-next-line
  }, []);

  return (
    <>
      {portfolioQuery.data && (
        <div className="root apply-font">
          <PortfolioStyle style={styleData.value || undefined} navbarHeight={navHeight} />
          {editMode.value && <InterfaceBar portfolioId={parseInt(portfolioId || "-1")} />}
          <div className="portfolio">
            <NavBar portfolio={portfolioQuery.data.data} />
            {portfolioQuery.data.data.elements.length > 0 &&
              (
                <ActiveComponent
                  element={getElementByIdRecursive(
                    activeElementId.value || portfolioQuery.data.data.elements.find((e) => e.home)?.id || -1,
                    portfolioQuery.data.data
                  )}
                />
              )}
          </div>
        </div>
      )}
    </>
  );
};
