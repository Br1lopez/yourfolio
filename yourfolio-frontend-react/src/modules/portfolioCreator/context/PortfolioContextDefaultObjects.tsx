import { ModalType } from "./PortfolioContextTypes";

export const NULL_MODAL_GETTER_DATA = {
  modalType: ModalType.CreateElement,
};

export const EXAMPLE_ELEMENT = {
  id: -1,
  name: "",
  style: {
    bgColor: "",
    fontColor: "",
  },
  elements: [],
  type: { id: "", name: "" },
  description: "",
  files: [],
  thumbnailFile: { id: -1, description: "", url: "" },
  position: -1,
};
