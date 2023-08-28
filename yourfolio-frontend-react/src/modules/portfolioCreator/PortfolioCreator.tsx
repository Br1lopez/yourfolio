import { NavBar } from "./components/navBar/NavBar";
import { useQuery } from "@tanstack/react-query";
import { getElement } from "src/api/elementRequests";
import React, { useContext, useEffect, useState } from "react";
import { ActiveComponent } from "./components/activeComponent/ActiveComponent";
import { PortfolioContext } from "../../hooks/PortfolioContext";
import { InterfaceBar } from "../../components/interfaceBar/InterfaceBar";
import "./portfolioCreator.scss";
import { PortfolioStyle } from "./components/PortfolioStyle";
import { applyFont, getElementByIdRecursive } from "src/utils/functions";
import { useParams } from "react-router-dom";
import { getUserInfo } from "src/api/authenticatedUserRequests";
import { ModalType } from "src/types/portfolioContextTypes";
import { AppLoader } from "src/components/loader/AppLoader";

export interface PortfolioCreatorProps {
  editMode?: boolean;
}

export const PortfolioCreator = (props: PortfolioCreatorProps) => {
  const { styleData, activeElementId, modalWindowData, editMode } =
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
      if (!activeElementId.value || activeElementId.value < 0) {
        activeElementId.set(response.data.elements.find((e) => e.home)?.id || -1);
      }
    },
  });

  const userQuery = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => getUserInfo(),
    onSuccess: (response) => {
      editMode.set((props.editMode || false) && response.data?.id === portfolioQuery.data?.data.user?.id);
    },
    enabled: !!portfolioQuery.data
  });

  useEffect(() => {
    if (localStorage.getItem("instructionsShown") !== "true") {
      modalWindowData.set({ ...modalWindowData.value, modalType: ModalType.Intro });
    }
    // pushWelcomeNotification(toaster);
    //eslint-disable-next-line
  }, []);

  if (!userQuery.data || !portfolioQuery.data) return <AppLoader />;


  return (
    <>
      {portfolioQuery.data && (
        <div className="root apply-font">
          <PortfolioStyle style={styleData.value || undefined} navbarHeight={navHeight} sidebarWidth={editMode ? "55px" : "0px"} />
          {editMode.value && <InterfaceBar portfolioId={parseInt(portfolioId || "-1")} />}
          <div className="portfolio">
            <NavBar portfolio={portfolioQuery.data.data} />
            {portfolioQuery.data.data.elements.length > 0 &&
              (
                <ActiveComponent
                  element={getElementByIdRecursive(
                    activeElementId.value || -1,
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
