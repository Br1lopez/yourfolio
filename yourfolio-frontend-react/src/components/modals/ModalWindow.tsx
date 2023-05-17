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
  ModalWindowData
} from "src/types/portfolioContextTypes";
import { ElementDTO, ElementSaveDTO, EMPTY_ELEMENT_DTO, EMPTY_ELEMENT_SAVE_DTO, mapElementDtoToElementSaveDto, StyleDTO } from "src/types/dtoTypes";
import { BgColorInput, FontColorInput } from "./components/StyleInputs";


export interface ModalWindowProps {
  modalProperties: ModalWindowData | null;
  portfolioId: number;
}

export const ModalWindow = (props: ModalWindowProps) => {
  const { modalWindowData, styleData } = useContext(PortfolioContext);
  const { modalProperties } = props;

  const [element, setElement] = useState<ElementSaveDTO>((modalProperties?.values || EMPTY_ELEMENT_SAVE_DTO));
  const [style, setStyle] = useState<StyleDTO>(styleData.value || {});
  const formRef = useRef<any>(null);


  const createElement = useCreateElementMutation(
    element,
    modalProperties?.parentId);

  const editElement = useEditElementMutation(
    modalProperties?.elementId || -1,
    element);

  const editStyle = useEditElementStyleMutation(
    props.portfolioId,
    style);


  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired("This field is required."),
    type: Schema.Types.StringType().isRequired(
      "Please enter a valid email address."
    ),
  });


  const handleSubmit = (event: any) => {
    if (formRef.current.check()) {
      switch (modalProperties?.modalType) {
        case ModalType.CreateElement:
          createElement.mutate();
          break;
        case ModalType.EditElement:
          editElement.mutate();
          break;
        case ModalType.SetSyle:
          console.log("hiu");
          editStyle.mutate();
          break;
      }
    }
  };

  const title = () => {
    switch (modalProperties?.modalType) {
      case ModalType.CreateElement:
        return "Nuevo elemento";
      case ModalType.EditElement:
        return "Editar elemento";
      case ModalType.SetSyle:
        return "Editar estilo";
    }
  };

  const modalBody = () => {
    switch (modalProperties?.modalType) {
      case ModalType.CreateElement:
      case ModalType.EditElement:
        return <Modal.Body>
          <ElementTitleInput state={{ value: element, set: setElement }} />
          <ElementTypeInput state={{ value: element, set: setElement }} />
          <CustomElementInputs state={{ value: element, set: setElement }} />
        </Modal.Body>
      case ModalType.SetSyle:
        return <Modal.Body>
          <BgColorInput state={{ value: style, set: setStyle }} />
          <FontColorInput state={{ value: style, set: setStyle }} />
        </Modal.Body>
    }
  };

  return (
    <Modal id="newTab" show={modalProperties != null}>
      <Modal.Header closeButton>
        <Modal.Title>{title()}</Modal.Title>
      </Modal.Header>
      <Form model={model} onSubmit={handleSubmit} ref={formRef}>
        {modalBody()}
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              appearance="default"
              onClick={() => modalWindowData.set(null)}
            >
              Cancelar
            </Button>
            <Button appearance="primary" type="submit">
              {title()}
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
