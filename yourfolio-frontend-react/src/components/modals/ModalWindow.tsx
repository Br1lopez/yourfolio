import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "rsuite";
import { PortfolioContext } from "src/hooks/PortfolioContext";

import { Form, ButtonToolbar, Button } from "rsuite";
import "./modal.scss";
import {
  CustomElementInputs,
  ElementTitleInput,
  ElementTypeInput,
} from "src/components/modals/inputs/ElementInputs";
import {
  useCreateElementMutation,
  useEditElementMutation,
  useEditElementStyleMutation,
} from "src/hooks/ElementMutations";
import {
  ModalType,
  ModalWindowData,
  NULL_MODAL_WINDOW_DATA,
  State,
} from "src/types/portfolioContextTypes";
import { EMPTY_ELEMENT_SAVE_DTO } from "src/types/dtoTypes";
import { ColorInputs, FontPickerComponent } from "./inputs/StyleInputs";
import { useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaPaintBrush, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import { ElementModalContent } from "./content/ElementModalContent";
import { StyleModalContent } from "./content/StyleModalContent";
import { IntroModalContent } from "./content/IntroModalContent";

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
      open={open}
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
