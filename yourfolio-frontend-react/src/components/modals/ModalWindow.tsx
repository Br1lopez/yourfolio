import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "rsuite";
import { PortfolioContext } from "src/hooks/PortfolioContext";

import {
  Form,
  ButtonToolbar,
  Button,
  Schema,
} from "rsuite";
import "./modal.scss";
import {
  CustomElementInputs,
  ElementTitleInput,
  ElementTypeInput,
} from "src/components/modals/inputs/ElementInputs";
import { useCreateElementMutation, useEditElementMutation, useEditElementStyleMutation } from "src/hooks/ElementMutations";
import {
  ModalType,
  ModalWindowData,
  NULL_MODAL_WINDOW_DATA,
  State
} from "src/types/portfolioContextTypes";
import { EMPTY_ELEMENT_SAVE_DTO } from "src/types/dtoTypes";
import { ColorInputs, FontPickerComponent } from "./inputs/StyleInputs";


export interface ModalWindowProps {
  modalProperties: State<ModalWindowData>;
  portfolioId: number;
}

export const ModalWindow = (props: ModalWindowProps) => {
  const { modalWindowData, styleData } = useContext(PortfolioContext);
  const { modalProperties } = props;
  const [open, setOpen] = useState<boolean>(false);

  const formRef = useRef<any>(null);


  const createElement = useCreateElementMutation(
    modalProperties?.value?.values || EMPTY_ELEMENT_SAVE_DTO,
    modalProperties?.value?.parentId);

  const editElement = useEditElementMutation(
    modalProperties.value.elementId || -1,
    modalProperties.value.values);

  const editStyle = useEditElementStyleMutation(
    props.portfolioId,
    styleData.value);

  const handleSubmit = (event: any) => {
    if (formRef.current.check()) {
      switch (modalProperties.value.modalType) {
        case ModalType.CreateElement:
          createElement.mutate();
          break;
        case ModalType.EditElement:
          editElement.mutate();
          break;
        case ModalType.SetSyle:
          editStyle.mutate();
          break;
      }
    } else {
      console.log(formRef.current.check());
    }
  };

  const title = () => {
    switch (modalProperties?.value?.modalType) {
      case ModalType.CreateElement:
        return "Nuevo elemento";
      case ModalType.EditElement:
        return "Editar elemento";
      case ModalType.SetSyle:
        return "Editar estilo";
    }
  };

  const modalBody = () => {
    switch (modalProperties?.value?.modalType) {
      case ModalType.CreateElement:
        return <Modal.Body>
          <ElementTitleInput modalState={modalProperties} />
          <ElementTypeInput modalState={modalProperties} />
          <CustomElementInputs modalState={modalProperties} />
        </Modal.Body>
      case ModalType.EditElement:
        return <Modal.Body>
          <ElementTitleInput modalState={modalProperties} />
          <ElementTypeInput disabled={true} modalState={modalProperties} />
          <CustomElementInputs modalState={modalProperties} />
        </Modal.Body>

      case ModalType.SetSyle:
        if (styleData.value) {
          return <Modal.Body style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>
            <ColorInputs state={{ value: styleData.value, set: styleData.set }} />
            {/* <BgColorInput state={{ value: styleData.value, set: styleData.set }} />
            <FontColorInput state={{ value: styleData.value, set: styleData.set }} /> */}
            <FontPickerComponent state={{ value: styleData.value, set: styleData.set }} />
          </Modal.Body>
        }
    }
  };

  useEffect(() => {
    if (modalProperties.value.modalType != ModalType.Hide) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modalProperties.value.modalType]);

  return (
    <Modal id="newTab"
      open={open}
      onClose={() => setOpen(false)}
      onExited={
        () => modalWindowData.set(
          { ...NULL_MODAL_WINDOW_DATA, modalType: ModalType.Hide })}
      backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{title()}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} ref={formRef}>
        {modalProperties.value && modalBody()}
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              appearance="default"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button appearance="primary" type="submit">
              {title()}
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Form>
    </Modal >
  );
};
