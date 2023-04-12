import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getElement } from "../../api/element";
import React,  { useContext , useState}  from "react";
import ActiveComponent from "./components/activeComponent/ActiveComponent";

export const PortfolioContext = React.createContext();

export const PageCreator = (portfolioId) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["getElement", 1],
    queryFn: () => getElement(1),
  });

  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <PortfolioContext.Provider value={{activeIndex, setActiveIndex}}>
      <DefaultHead></DefaultHead>
      {query.data && (
        <>
          <NavBar
            title={query.data.name}
            tabs={query.data.elements
              .sort((a, b) => a.position - b.position)
              .map((tab) => ({ name: tab.name, id: tab.id }))}
          />
          <ActiveComponent/>
        </>
      )}
    </PortfolioContext.Provider>
  );
};
