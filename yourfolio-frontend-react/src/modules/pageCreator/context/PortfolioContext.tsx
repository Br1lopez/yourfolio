import React, { useState } from "react";
import { useToaster } from "rsuite";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
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
  portfolioId: {
    value: number;
    set: (value: number) => void;
  };
  activeModalData: {
    value: ActiveModalCtxData;
    set: (value: ActiveModalCtxData) => void;
  };
  toaster?: any;
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

// export const portfolioContextData = () => {
//   const [activeElementId, setActiveElementId] = useState(1);
//   const [portfolioId, setPortfolioId] = useState(1);
//   const [activeModalData, setActiveModalData] = useState<ActiveModalCtxData>({
//     parentId: null,
//     elementId: null,
//     type: null,
//   });

//   return {
//     activeElementId: { value: activeElementId, set: setActiveElementId },
//     portfolioId: { value: portfolioId, set: setPortfolioId },
//     activeModalData: { value: activeModalData, set: setActiveModalData },
//   };
// };

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
  
