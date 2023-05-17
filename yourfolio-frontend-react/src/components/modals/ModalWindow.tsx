import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
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
} from "src/components/modals/components/ElementInputs";
import { useCreateElementMutation, useEditElementMutation, useEditElementStyleMutation } from "src/hooks/ElementMutations";
import {
  ModalType,
  ModalWindowData,
  NULL_MODAL_WINDOW_DATA,
  NULL_STATE,
  State
} from "src/types/portfolioContextTypes";
import { EMPTY_ELEMENT_SAVE_DTO, mapElementDtoToElementSaveDto, StyleDTO } from "src/types/dtoTypes";
import { BgColorInput, FontColorInput } from "./components/StyleInputs";


export interface ModalWindowProps {
  modalProperties: State<ModalWindowData>;
  portfolioId: number;
}

export const ModalWindow = (props: ModalWindowProps) => {
  const { modalWindowData, styleData } = useContext(PortfolioContext);
  const { modalProperties } = props;

  const formRef = useRef<any>(null);


  const createElement = useCreateElementMutation(
    modalProperties?.value?.values || EMPTY_ELEMENT_SAVE_DTO,
    modalProperties?.value?.parentId);

  const editElement = useEditElementMutation(
    modalProperties?.value?.elementId || -1,
    modalProperties?.value?.values || EMPTY_ELEMENT_SAVE_DTO);

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
      case ModalType.EditElement:

        return <Modal.Body>
          <ElementTitleInput modalState={modalProperties} />
          <ElementTypeInput modalState={modalProperties} />
          <CustomElementInputs modalState={modalProperties} />
        </Modal.Body>

      case ModalType.SetSyle:
        if (styleData.value) {
          return <Modal.Body>
            <BgColorInput state={{ value: styleData.value, set: styleData.set }} />
            <FontColorInput state={{ value: styleData.value, set: styleData.set }} />
          </Modal.Body>
        }
    }
  };

  return (
    <Modal id="newTab" show={modalProperties.value.modalType != ModalType.Hide}>
      <Modal.Header closeButton>
        <Modal.Title>{title()}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} ref={formRef}>
        {modalProperties.value && modalBody()}
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              appearance="default"
              onClick={() => modalWindowData.set({ ...NULL_MODAL_WINDOW_DATA, modalType: ModalType.Hide })}
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
