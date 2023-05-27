import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { getPortfolios, getUserInfo } from "src/api/authenticatedUserRequests";
import "./home.scss";
import { FaPlus, } from "react-icons/fa";
import { PortfolioContext } from "src/hooks/PortfolioContext";
import { ModalType } from "src/types/portfolioContextTypes";
import { EMPTY_ELEMENT_SAVE_DTO } from "src/types/dtoTypes";
import { InterfaceBar } from "../../components/interfaceBar/InterfaceBar";
import { PortfolioThumbnail } from "./components/PortfolioThumbnail";

const Home = () => {
  const { modalWindowData, editMode } = useContext(PortfolioContext);

  const userQuery = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => getUserInfo(),
  });

  const portfoliosQuery = useQuery({
    queryKey: ["getPortfolios"],
    queryFn: () => getPortfolios(),
  });

  useEffect(() => {
    editMode.set(true);
  }, [editMode]);

  return (
    <div className="yourfolio-root">
      <InterfaceBar />
      <div className="yourfolio-home__content">
        <h1 className="yourfolio-home__content__title welcome">
          Bienvenido, {userQuery.data?.data.name}.
        </h1>

        <h1 className="yourfolio-home__content__title portfolios">
          TUS PORTFOLIOS:
        </h1>
        <div className="yourfolio-home__content__portfolios">
          {portfoliosQuery.data?.data.map((portfolio) => (
            <PortfolioThumbnail portfolio={portfolio} key={portfolio.id} />
          ))}
          <div
            className="yourfolio-home__content__portfolios__add-portfolio"
            onClick={() => {
              console.log("click");
              modalWindowData.set({
                modalType: ModalType.CreateElement,
                values: { ...EMPTY_ELEMENT_SAVE_DTO },
              });
            }}
          >
            <FaPlus className="yourfolio-home__content__portfolios__add-portfolio__icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
