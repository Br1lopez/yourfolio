import React, { useContext, useEffect, useState } from "react";
import { Modal } from "rsuite";
import "./modal.scss";
import {
  ModalType,
  ModalWindowData,
  NULL_MODAL_WINDOW_DATA,
  State,
} from "src/types/portfolioContextTypes";
import { ElementModalContent } from "./content/ElementModalContent";
import { StyleModalContent } from "./content/StyleModalContent";
import { IntroModalContent } from "./content/IntroModalContent";
import { PortfolioContext } from "src/hooks/PortfolioContext";

export interface ModalWindowProps {
  modalProperties: State<ModalWindowData>;
}

export interface ModalContentProps {
  modalProperties: State<ModalWindowData>;
  open: State<boolean>;
}


export const ModalWindow = (props: ModalWindowProps) => {
  const { modalProperties } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { editMode } = useContext(PortfolioContext)

  useEffect(() => {
    if (modalProperties.value.modalType !== ModalType.Hide) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modalProperties.value.modalType]);

  const modalContent = () => {
    switch (modalProperties.value.modalType) {
      case ModalType.CreateElement:
      case ModalType.EditElement:
        return <ElementModalContent modalProperties={modalProperties} open={{ value: open, set: setOpen }} />;
      case ModalType.SetSyle:
        return <StyleModalContent modalProperties={modalProperties} open={{ value: open, set: setOpen }} />;
      case ModalType.Intro:
        return <IntroModalContent modalProperties={modalProperties} open={{ value: open, set: setOpen }} />;
    }
  };

  return (
    <Modal
      id="newTab"
      open={editMode.value && open}
      onClose={() => setOpen(false)}
      onExited={() =>
        modalProperties.set({
          ...NULL_MODAL_WINDOW_DATA,
          modalType: ModalType.Hide,
        })
      }
      backdrop="static"
    >
      {modalContent()}
    </Modal>
  );
};
