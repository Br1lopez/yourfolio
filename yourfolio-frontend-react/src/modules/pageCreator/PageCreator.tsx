import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getElement } from "../../api/element";
import React, { useEffect, useState } from "react";
import ActiveComponent from "./components/activeComponent/ActiveComponent";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: -1,
  activeModalData: {
    value: { parentId: null, elementId: null, type: null },
    set: () => console.log("set"),
  },
});

export interface PortfolioCtxData {
  activeElementId: {
    value: number;
    set: (value: number) => void;
  };
  portfolioId: number;
  activeModalData: {
    value: ActiveModalCtxData;
    set: (value: ActiveModalCtxData) => void;
  };
}

export interface ActiveModalCtxData {
  parentId: number | null;
  elementId: number | null;
  type: ModalType | null;
}

export enum ModalType {
  Create,
  Edit,
}

function getElementByIdRecursive(id: number, element: any): any {
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

export interface PageCreatorProps {
  portfolioId: number;
}

export const PageCreator = (props: PageCreatorProps) => {
  const portfolioId = props.portfolioId;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["getElement", portfolioId],
    queryFn: () => getElement(portfolioId),
  });

  const getElementFromData = (id: number) => {
    return getElementByIdRecursive(id, query.data);
  };

  const [activeElementId, setActiveElementId] = useState(1);
  const [activeModalData, setActiveModalData] = useState<ActiveModalCtxData>({
    parentId: null,
    elementId: null,
    type: null,
  });

  return (
    <PortfolioContext.Provider
      value={{
        activeElementId: { value: activeElementId, set: setActiveElementId },
        portfolioId: portfolioId,
        activeModalData: { value: activeModalData, set: setActiveModalData },
      }}
    >
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
            <ActiveComponent data={getElementFromData(activeElementId)} />
          )}
        </>
      )}
    </PortfolioContext.Provider>
  );
};
