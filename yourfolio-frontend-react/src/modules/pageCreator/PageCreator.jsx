import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getElement } from "../../api/element";
import React from "react";
import ActiveComponent from "./components/activeComponent/ActiveComponent";

export const PortfolioContext = React.createContext();

export const PageCreator = (portfolioId) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["getElement", 1],
    queryFn: () => getElement(1),
  });
  const [activeElementIndex, setActiveElementIndex] = React.useState(1);

  const portfolioContext = {
    index: activeElementIndex, 
    setIndex: setActiveElementIndex
  };

  return (
    <PortfolioContext.Provider value={portfolioContext}>
      <DefaultHead></DefaultHead>
      {query.data && (
        <>
          <NavBar
            title={query.data.name}
            tabs={query.data.elements
              .sort((a, b) => a.position - b.position)
              .map((tab) => ({ name: tab.name, index: tab.id }))}
          />
          <ActiveComponent data={query.data.elements.filter(e => {return e.position = activeElementIndex})[0]} />
        </>
      )}
    </PortfolioContext.Provider>
  );
};
