import React, { useEffect, useState } from "react";
import { ElementDTO, EMPTY_ELEMENT_DTO, } from "src/types/dtoTypes";
import {
  ModalType,
  ModalWindowData,
  PortfolioCtxData
} from "../types/portfolioContextTypes";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: { value: -1, set: () => console.log("set") },
  portfolioId: { value: -1, set: () => console.log("set") },
  portfolioData: { value: EMPTY_ELEMENT_DTO, set: () => console.log("set") },

  modalWindowData: {
    value: { element: EMPTY_ELEMENT_DTO, modalType: ModalType.CreateElement },
    set: () => console.log("set"),
  },
});


export const usePortfolioContext = (): PortfolioCtxData => {
  const [activeElementId, setActiveElementId] = useState(1);
  const [windowModalData, setWindowModalData] =
    useState<ModalWindowData | null>(null);




  return {
    activeElementId: { value: activeElementId, set: setActiveElementId },
    modalWindowData: {
      value: windowModalData,
      set: setWindowModalData,
    },
  };
};
function modalDataSetterToGetter(activeModalDataSetter: ModalWindowData | null, portfolioData: ElementDTO): React.SetStateAction<ModalDataGetter | null> {
  throw new Error("Function not implemented.");
}

