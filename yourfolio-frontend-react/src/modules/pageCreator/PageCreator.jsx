import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getElement } from "../../api/element";
import React, { useContext, useState } from "react";
import ActiveComponent from "./components/activeComponent/ActiveComponent";

export const PortfolioContext = React.createContext();

function getElementByIdRecursive(id, element) {
  if (element === null) {
    return null;
  }

  if (element.id === id) {
    return element;
  }

  for (let i = 0; i < element.elements.length; i++) {
    const child = element.elements[i];
    const result = getElementByIdRecursive(id, child);
    if (result !== null) {
      return result;
    }
  }

  return null;
}

export const PageCreator = (portfolioId) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["getElement", 1],
    queryFn: () => getElement(1),
  });

  const getElementFromData = (id) => {
    return getElementByIdRecursive(id, query.data);
  };

  const [activeElementId, setActiveElementId] = useState(1);

  return (
    <PortfolioContext.Provider value={{ activeElementId, setActiveElementId, portfolioId }}>
      <DefaultHead></DefaultHead>
      {query.data && (
        <>
          <NavBar
            title={query.data.name}
            tabs={query.data.elements
              .sort((a, b) => a.position - b.position)
              .map((tab) => ({ name: tab.name, id: tab.id }))}
          />
          <ActiveComponent data={getElementFromData(activeElementId)} />
        </>
      )}
    </PortfolioContext.Provider>
  );
};
