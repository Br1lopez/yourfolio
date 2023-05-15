import { ElementDTO } from "src/api/dtoTypes";

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

export interface ModalDataSetter {
  parentId?: number;
  elementId?: number;
  modalType: ModalType;
}

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
