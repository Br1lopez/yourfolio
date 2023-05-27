import React, { useState } from "react";
import { StyleDTO, } from "src/types/dtoTypes";
import {
  ModalWindowData,
  NULL_MODAL_WINDOW_DATA,
  NULL_STATE,
  PortfolioCtxData
} from "../types/portfolioContextTypes";
import { useToaster } from "rsuite";

export const PortfolioContext = React.createContext<PortfolioCtxData>({
  activeElementId: NULL_STATE,
  modalWindowData: {
    value: NULL_MODAL_WINDOW_DATA,
    set: () => console.log("set")
  },
  styleData: NULL_STATE,
  editMode: {
    value: false,
    set: () => console.log("set")
  },
});

export const usePortfolioContext = (): PortfolioCtxData => {
  const [activeElementId, setActiveElementId] = useState<number | null>(null);
  const [windowModalData, setWindowModalData] = useState<ModalWindowData>(NULL_MODAL_WINDOW_DATA);
  const [styleData, setStyleData] = useState<StyleDTO | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const toaster = useToaster();

  return {
    activeElementId: { value: activeElementId, set: setActiveElementId },
    modalWindowData: { value: windowModalData, set: setWindowModalData },
    styleData: { value: styleData, set: setStyleData },
    editMode: { value: editMode, set: setEditMode },
    toaster
  };
};