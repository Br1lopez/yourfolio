import {
  ElementSaveDTO,
  EMPTY_ELEMENT_SAVE_DTO,
  StyleDTO,
} from "src/types/dtoTypes";

export interface State<T> {
  value: T;
  set: (value: T) => void;
}

export const NULL_STATE = { value: null, set: () => { } };

export enum ModalType {
  Hide,
  CreateElement,
  EditElement,
  DeleteElement,
  SetSyle,
}

export interface PortfolioCtxData {
  activeElementId: State<number | null>;
  modalWindowData: State<ModalWindowData>;
  styleData: State<StyleDTO | null>;
  editMode: State<boolean>;
  toaster?: any;
}

export const NULL_MODAL_WINDOW_DATA = {
  parentId: -1,
  values: EMPTY_ELEMENT_SAVE_DTO,
  modalType: ModalType.Hide,
};

export interface ModalWindowData {
  parentId?: number;
  elementId?: number;
  values: ElementSaveDTO;
  modalType: ModalType;
}
