import React, { useEffect, useState } from "react";
import { ElementDTO } from "src/api/dtoTypes";
import { getElementByIdRecursive } from "src/utils/functions";
import {
  ActiveModalDataGetter,
  ActiveModalDataSetter,
  ModalType,
  PortfolioCtxData,
} from "./PortfolioContextTypes";
import {
  EXAMPLE_ELEMENT,
  NULL_MODAL_GETTER_DATA,
} from "./PortfolioContextDefaultObjects";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
  portfolioData: { value: EXAMPLE_ELEMENT, set: () => console.log("set") },

  activeModalData: {
    value: { element: EXAMPLE_ELEMENT, modalType: ModalType.CreateElement },
    set: () => console.log("set"),
  },
});

export const usePortfolioContext = (): PortfolioCtxData => {
  const [activeElementId, setActiveElementId] = useState(1);
  const [portfolioId, setPortfolioId] = useState(1);
  const [activeModalDataSetter, setActiveModalDataSetter] =
    useState<ActiveModalDataSetter | null>(null);
  const [portfolioData, setPortfolioData] =
    useState<ElementDTO>(EXAMPLE_ELEMENT);
  const [activeModalDataGetter, setActiveModalDataGetter] =
    useState<ActiveModalDataGetter>(NULL_MODAL_GETTER_DATA);

  useEffect(() => {
    if (activeModalDataSetter === null) return;

    setActiveModalDataGetter({
      parentId: activeModalDataSetter.parentId,
      element:
        getElementByIdRecursive(
          activeModalDataSetter?.elementId || -1,
          portfolioData
        ) || undefined,
      modalType: activeModalDataSetter.modalType || ModalType.CreateElement,
    });
  }, [activeModalDataSetter]);

  return {
    activeElementId: { value: activeElementId, set: setActiveElementId },
    portfolioId: { value: portfolioId, set: setPortfolioId },
    activeModalData: {
      value: activeModalDataGetter,
      set: setActiveModalDataSetter,
    },
    portfolioData: { value: portfolioData, set: setPortfolioData },
  };
};
