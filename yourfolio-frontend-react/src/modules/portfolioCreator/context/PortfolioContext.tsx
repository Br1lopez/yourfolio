import React, { useState } from "react";
import { ElementDTO } from "src/api/elementTypes";

export const EMPTY_MODAL_CONTENT: ModalContent = {
  name: "",
  elementType: "",
};

export const NULL_MODAL_DATA = {
  parentId: null,
  elementId: null,
  modalType: null,
  modalContent: null,
};

const EXAMPLE_ELEMENT = {
  id: -1,
  name: "",
  style: {
    bgColor: "",
    fontColor: "",
  },
  elements: [],
  type: { id: "", name: "" },
  description: "",
  files: [],
  thumbnailFile: { id: -1, description: "", url: "" },
  position: -1,
};
export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
  portfolioData: { value: EXAMPLE_ELEMENT, set: () => console.log("set") },

  activeModalData: {
    value: NULL_MODAL_DATA,
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
  elementId: number | null; //0 if new element
  modalType: ModalType | null;
  modalContent: ModalContent | null;
}

export interface ModalContent {
  name: string;
  elementType: string;
  description?: string;
  image?: File;
}

export interface State<T> {
  value: T;
  set: (value: T) => void;
}

export enum ModalType {
  CreateElement,
  EditElement,
  SetSyle,
}

export const usePortfolioContext = () => {
  const [activeElementId, setActiveElementId] = useState(1);
  const [portfolioId, setPortfolioId] = useState(1);
  const [activeModalData, setActiveModalData] = useState<ActiveModalCtxData>({
    parentId: null,
    elementId: null,
    modalType: null,
    modalContent: null,
  });
  const [portfolioData, setPortfolioData] =
    useState<ElementDTO>(EXAMPLE_ELEMENT);

  return {
    activeElementId: { value: activeElementId, set: setActiveElementId },
    portfolioId: { value: portfolioId, set: setPortfolioId },
    activeModalData: { value: activeModalData, set: setActiveModalData },
    portfolioData: { value: portfolioData, set: setPortfolioData },
  };
};
