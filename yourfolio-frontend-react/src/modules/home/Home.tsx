import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getPortfolios, getUserInfo } from "src/api/authenticatedUserRequests";
import "./home.scss";
import { FaPlus } from "react-icons/fa";
import { PortfolioContext } from "src/hooks/PortfolioContext";
import { ModalType } from "src/types/portfolioContextTypes";
import { EMPTY_ELEMENT_SAVE_DTO } from "src/types/dtoTypes";
import { useNavigate } from "react-router-dom";
import { InterfaceBar } from "../../components/interfaceBar/InterfaceBar";

const Home = () => {
  const { modalWindowData } = useContext(PortfolioContext);
  const navigate = useNavigate();

  const userQuery = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => getUserInfo(),
  });

  const portfoliosQuery = useQuery({
    queryKey: ["getPortfolios"],
    queryFn: () => getPortfolios(),
  });

  return (
    <div className="yourfolio-root">
      <InterfaceBar />
      <div className="yourfolio-home__content">
        <h1 className="yourfolio-home__content__title welcome">
          Bienvenido, {userQuery.data?.name}.
        </h1>

        <h1 className="yourfolio-home__content__title portfolios">
          TUS PORTFOLIOS:
        </h1>
        <div className="yourfolio-home__content__portfolios">
          {portfoliosQuery.data?.map((portfolio) => (
            <div
              key={`portfolio_${portfolio.id}}`}
              className="yourfolio-home__content__portfolios__portfolio"
              onClick={() => navigate("/portfolio/" + portfolio.id + "/edit")}
            >
              <div
                className="yourfolio-home__content__portfolios__portfolio__thumbnail"
                style={{
                  backgroundColor: portfolio.style?.bgColor || "#b4b1ac",
                }}
              ></div>
              <div className="yourfolio-home__content__portfolios__portfolio__title">
                {portfolio.name}
              </div>
            </div>
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
