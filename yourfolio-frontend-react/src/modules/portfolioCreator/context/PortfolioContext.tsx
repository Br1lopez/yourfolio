import React, { useEffect, useState } from "react";
import { ElementDTO } from "src/api/dtoTypes";
import { getElementByIdRecursive } from "src/utils/functions";
import {
  ModalDataGetter,
  ModalDataSetter,
  ModalType,
  PortfolioCtxData,
} from "./PortfolioContextTypes";
import {
  EMPTY_ELEMENT,
  NULL_MODAL_GETTER_DATA,
} from "./PortfolioContextDefaultObjects";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
  portfolioData: { value: EMPTY_ELEMENT, set: () => console.log("set") },

  activeModalData: {
    value: { element: EMPTY_ELEMENT, modalType: ModalType.CreateElement },
    set: () => console.log("set"),
  },
});

function modalDataSetterToGetter(modalDataSetter: ModalDataSetter | null, portfolioData: ElementDTO): ModalDataGetter | null {
  if (modalDataSetter == null) {
    return null;

  } else {
    return {
      parentId: modalDataSetter.parentId,
      element: (modalDataSetter.elementId
        && getElementByIdRecursive(modalDataSetter?.elementId, portfolioData))
        || EMPTY_ELEMENT,
      modalType: modalDataSetter.modalType
    };
  }

}

export const usePortfolioContext = (): PortfolioCtxData => {
  const [activeElementId, setActiveElementId] = useState(1);
  const [portfolioId, setPortfolioId] = useState(1);
  const [activeModalDataSetter, setActiveModalDataSetter] =
    useState<ModalDataSetter | null>(null);
  const [portfolioData, setPortfolioData] =
    useState<ElementDTO>(EMPTY_ELEMENT);
  const [activeModalDataGetter, setActiveModalDataGetter] =
    useState<ModalDataGetter | null>(NULL_MODAL_GETTER_DATA);

  useEffect(() => {
    setActiveModalDataGetter(modalDataSetterToGetter(activeModalDataSetter, portfolioData));
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
