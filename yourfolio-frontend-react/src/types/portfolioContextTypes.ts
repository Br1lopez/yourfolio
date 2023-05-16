import { ElementDTO, EMPTY_ELEMENT_DTO } from "src/types/dtoTypes";
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
  activeElementId: State<number>;
  portfolioId: State<number>;
  portfolioData: State<ElementDTO>;

  /** Datos de la ventana "modal" (usada para crear/editar elementos).
   * Si es null, no se muestra ninguna ventana modal.
   * El elemento al que hace referencia la ventana se setea con un id, pero se recupera completo.
   */
  activeModalData: {
    value: ModalDataGetter | null;
    set: (value: ModalDataSetter | null) => void;
  };

  toaster?: any;
}

export interface ModalDataGetter {
  parent?: ElementDTO;
  element?: ElementDTO;
  modalType: ModalType;
}

export const NULL_MODAL_GETTER_DATA = {
  modalType: ModalType.CreateElement,
};

export interface ModalDataSetter {
  parentId?: number;
  elementId?: number;
  modalType: ModalType;
}


export function mapModalDataSetterToGetter(modalDataSetter: ModalDataSetter | null, portfolioData: ElementDTO): ModalDataGetter | null {
  if (modalDataSetter == null) {
    return null;

  } else {
    return {
      parent:
        getElementByIdRecursive(modalDataSetter?.parentId || -1, portfolioData)
        || EMPTY_ELEMENT_DTO,
      element:
        getElementByIdRecursive(modalDataSetter?.elementId || -1, portfolioData)
        || EMPTY_ELEMENT_DTO,
      modalType: modalDataSetter.modalType
    };
  }
}