import React, { useEffect, useState } from "react";
import { ElementDTO, EMPTY_ELEMENT_DTO, } from "src/types/dtoTypes";
import {
  ModalType,
  ModalDataGetter,
  ModalDataSetter,
  PortfolioCtxData,
  mapModalDataSetterToGetter,
  NULL_MODAL_GETTER_DATA
} from "../types/portfolioContextTypes";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
  portfolioData: { value: EMPTY_ELEMENT_DTO, set: () => console.log("set") },

  activeModalData: {
    value: { element: EMPTY_ELEMENT_DTO, modalType: ModalType.CreateElement },
    set: () => console.log("set"),
  },
});


export const usePortfolioContext = (): PortfolioCtxData => {
  const [activeElementId, setActiveElementId] = useState(1);
  const [portfolioId, setPortfolioId] = useState(1);
  const [activeModalDataSetter, setActiveModalDataSetter] =
    useState<ModalDataSetter | null>(null);
  const [portfolioData, setPortfolioData] =
    useState<ElementDTO>(EMPTY_ELEMENT_DTO);
  const [activeModalDataGetter, setActiveModalDataGetter] =
    useState<ModalDataGetter | null>(NULL_MODAL_GETTER_DATA);

  useEffect(() => {
    setActiveModalDataGetter(mapModalDataSetterToGetter(activeModalDataSetter, portfolioData));
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
function modalDataSetterToGetter(activeModalDataSetter: ModalDataSetter | null, portfolioData: ElementDTO): React.SetStateAction<ModalDataGetter | null> {
  throw new Error("Function not implemented.");
}

