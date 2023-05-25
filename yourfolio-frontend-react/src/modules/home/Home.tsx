import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPortfolios, getUserInfo } from "src/api/authenticatedUserRequests";
import { HomeSidebar } from "./components/homeSideBar/HomeSideBar";
import "./home.scss";

const Home = () => {
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
      <HomeSidebar></HomeSidebar>
      <div className="yourfolio-home__content">
        <h1 className="yourfolio-home__content__title">Bienvenido, {userQuery.data?.name}</h1>
        <div className="yourfolio-home__content__portfolios">
          {portfoliosQuery.data?.map((portfolio) => (
            <div
              key={`portfolio_${portfolio.id}}`}
              className="yourfolio-home__content__portfolios__portfolio"
            >
              <div
                className="yourfolio-home__content__portfolios__portfolio__thumbnail"
                style={{ backgroundColor: (portfolio.style?.bgColor || "red") }}
              ></div>
              <div className="yourfolio-home__content__portfolios__portfolio__title">
                {portfolio.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
