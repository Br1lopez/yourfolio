import React, { useState } from "react";
import { ElementDTO } from "src/api/elementTypes";


const EXAMPLE_ELEMENT = {
  id: -1,
  name: "",
  style: {
    bgColor: "",
    fontColor: "",
},
  elements: [],
  type: "",
  description: "",
  files: [],
  thumbnailFile: { id: -1, description:"", url: ""},
   position: -1
}
export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
  portfolioData: {value: EXAMPLE_ELEMENT, set: () => console.log("set")},

  activeModalData: {
    value: { parentId: null, elementId: null, type: null },
    set: () => console.log("set"),
  },
});

export interface PortfolioCtxData {
  activeElementId: State<number>;
  portfolioId: State<number>;
  portfolioData: State<ElementDTO>;
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
  const [portfolioData, setPortfolioData] = useState<ElementDTO>(EXAMPLE_ELEMENT);

  return {
    activeElementId: { value: activeElementId, set: setActiveElementId },
    portfolioId: { value: portfolioId, set: setPortfolioId },
    activeModalData: { value: activeModalData, set: setActiveModalData },
    portfolioData: { value: portfolioData, set: setPortfolioData },
  };
};
