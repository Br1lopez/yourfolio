import { ElementDTO, EMPTY_ELEMENT_DTO, StyleDTO } from "src/types/dtoTypes";
import { getElementByIdRecursive } from "src/utils/functions";

export interface State<T> {
  value: T;
  set: (value: T) => void;
}

export enum ModalType {
  CreateElement,
  EditElement,
  DeleteElement,
  SetSyle,
}

export interface PortfolioCtxData {
  activeElementId: State<number | null>;
  modalWindowData: State<ModalWindowData | null>;
  styleData: State<StyleDTO | null>;
  toaster?: any;
}


export const NULL_MODAL_WINDOW_DATA = {
  modalType: ModalType.CreateElement,
};

export interface ModalWindowData {
  parentId?: number;
  elementId?: number;
  modalType: ModalType;
}