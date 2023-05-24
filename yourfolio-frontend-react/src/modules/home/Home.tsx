import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPortfolios } from "src/api/elementRequests";
import { HomeSidebar } from "./components/homeSideBar/HomeSideBar";
import "./home.scss";

//TODO: AÑADIR GETuSER() PARA NOMBRE
const Home = () => {
  const query = useQuery({
    queryKey: ["getPortfolios"],
    queryFn: () => getPortfolios(),
  });
  return (
    <div className="yourfolio-root">
      <HomeSidebar></HomeSidebar>
      <div className="yourfolio-home__content">
        <h1 className="yourfolio-home__content__title">Bienvenido</h1>
        <div className="yourfolio-home__content__portfolios">
          {query.data?.map((portfolio) => (
            <div
              key={`portfolio_${portfolio.id}}`}
              className="yourfolio-home__content__portfolios__portfolio"
            >
              <div
                className="yourfolio-home__content__portfolios__portfolio__thumbnail"
                style={{ backgroundColor: portfolio.style?.bgColor || "grey" }}
              ></div>
              <span className="yourfolio-home__content__portfolios__portfolio__title">
                {portfolio.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
