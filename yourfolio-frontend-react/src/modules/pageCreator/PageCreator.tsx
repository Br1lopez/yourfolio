import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getElement } from "../../api/element";
import React, { useContext, useEffect } from "react";
import ActiveComponent from "./components/activeComponent/ActiveComponent";
import { getElementByIdRecursive } from "../../utils/functions";
import { PortfolioContext } from "./context/PortfolioContext";

export interface PageCreatorProps {
  portfolioId: number;
}

export const PageCreator = (props: PageCreatorProps) => {
  const { portfolioId, activeElementId } = useContext(PortfolioContext);

  useEffect(() => {
    portfolioId.set(props.portfolioId);
  }, []);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["getElement", props.portfolioId],
    queryFn: () => getElement(props.portfolioId),
  });

  return (
    <>
      <DefaultHead></DefaultHead>
      {query.data && (
        <>
          <NavBar
            title={query.data.name}
            tabs={query.data.elements
              .sort((a: any, b: any) => a.position - b.position)
              .map((tab: any) => ({ name: tab.name, id: tab.id }))}
          />
          {query.data.elements.length > 0 && (
            <ActiveComponent
              data={getElementByIdRecursive(activeElementId.value, query.data)}
            />
          )}
        </>
      )}
    </>
  );
};
