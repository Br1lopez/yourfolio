import React, { useState } from "react";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
  activeModalData: {
    value: { parentId: null, elementId: null, type: null },
    set: () => console.log("set"),
  },
});

export interface PortfolioCtxData {
  activeElementId: State<number>;
  portfolioId: State<number>;
  activeModalData: State<ActiveModalCtxData>;
  toaster?: any;
}

export interface ActiveModalCtxData {
  parentId: number | null;
  elementId: number | null;
  type: ModalType | null;
}

export interface State<T> {
  value: T;
  set: (value: T) => void;
}

export enum ModalType {
  Create,
  Edit,
}

export const usePortfolioContext = () => {
  const [activeElementId, setActiveElementId] = useState(1);
  const [portfolioId, setPortfolioId] = useState(1);
  const [activeModalData, setActiveModalData] = useState<ActiveModalCtxData>({
    parentId: null,
    elementId: null,
    type: null,
  });

  return {
    activeElementId: { value: activeElementId, set: setActiveElementId },
    portfolioId: { value: portfolioId, set: setPortfolioId },
    activeModalData: { value: activeModalData, set: setActiveModalData },
  };
};
