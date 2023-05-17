import React, { useState } from "react";
import { StyleDTO, } from "src/types/dtoTypes";
import {
  ModalWindowData,
  NULL_STATE,
  PortfolioCtxData
} from "../types/portfolioContextTypes";
import { useToaster } from "rsuite";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: NULL_STATE,
  modalWindowData: NULL_STATE,
  styleData: NULL_STATE,
});

export const usePortfolioContext = (): PortfolioCtxData => {
  const [activeElementId, setActiveElementId] = useState<number | null>(null);
  const [windowModalData, setWindowModalData] = useState<ModalWindowData | null>(null);
  const [styleData, setStyleData] = useState<StyleDTO | null>(null);
  const toaster = useToaster();

  return {
    activeElementId: { value: activeElementId, set: setActiveElementId },
    modalWindowData: { value: windowModalData, set: setWindowModalData },
    styleData: { value: styleData, set: setStyleData },
    toaster
  };
};