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
import { useCreateElementMutation, useEditElementMutation } from "src/hooks/ElementMutations";
import {
  ModalDataGetter,
  ModalType,
} from "src/types/portfolioContextTypes";
import { ElementDTO, EMPTY_ELEMENT_DTO, mapElementDtoToElementSaveDto, StyleDTO } from "src/types/dtoTypes";
import { BgColorInput, FontColorInput } from "./components/StyleInputs";


export interface ModalWindowProps {
  modalProperties: ModalDataGetter | null;
}

export const ModalWindow = (props: ModalWindowProps) => {
  const { modalWindowData: activeModalData, portfolioData } = useContext(PortfolioContext);
  const { modalProperties } = props;

  const [element, setElement] = useState<ElementDTO>((modalProperties?.element || EMPTY_ELEMENT_DTO));
  const [style, setStyle] = useState<StyleDTO>(portfolioData.value.style);
  const formRef = useRef<any>(null);


  const createElement = useCreateElementMutation(
    mapElementDtoToElementSaveDto(element),
    modalProperties?.parent?.id);

  const editElement = useEditElementMutation(
    modalProperties?.element?.id || -1,
    mapElementDtoToElementSaveDto(element));

  const editStyle = useEditElementMutation(
    portfolioData.value.id,
    mapElementDtoToElementSaveDto({ ...portfolioData.value, style }));


  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired("This field is required."),
    type: Schema.Types.StringType().isRequired(
      "Please enter a valid email address."
    ),
  });

  useEffect(() => {
    setElement(modalProperties?.element || EMPTY_ELEMENT_DTO);
  }, [modalProperties]);

  useEffect(() => {
    if (portfolioData.value.style)
      setStyle(portfolioData.value.style);
  }, [portfolioData.value]);


  useEffect(() => {
    portfolioData.set({ ...portfolioData.value, style })
  }, [style]);

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
          <ElementTypeInput state={{ value: element, set: setElement }} parent={activeModalData.value?.parent} />
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
              onClick={() => activeModalData.set(null)}
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
