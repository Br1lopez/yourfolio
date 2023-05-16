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
} from "src/modules/portfolioCreator/components/modals/components/elementInputs";
import { useCreateElementMutation, useEditElementMutation } from "src/hooks/ElementMutations";
import {
  ModalDataGetter,
  ModalType,
} from "../../../../types/portfolioContextTypes";
import { ElementDTO, EMPTY_ELEMENT_DTO, mapElementDtoToElementSaveDto } from "src/types/dtoTypes";


export interface ModalWindowProps {
  modalProperties: ModalDataGetter | null;
}

export const ModalWindow = (props: ModalWindowProps) => {
  const { activeModalData } = useContext(PortfolioContext);
  const { modalProperties } = props;
  const [element, setElement] = useState<ElementDTO>(EMPTY_ELEMENT_DTO);
  const formRef = useRef<any>(null);
  const createElement = useCreateElementMutation(
    mapElementDtoToElementSaveDto(element),
    modalProperties?.parent?.id
  );
  const editElement = useEditElementMutation(
    modalProperties?.element?.id || -1,
    mapElementDtoToElementSaveDto(element),
  );
  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired("This field is required."),
    type: Schema.Types.StringType().isRequired(
      "Please enter a valid email address."
    ),
  });

  useEffect(() => {
    setElement(modalProperties?.element || EMPTY_ELEMENT_DTO);
  }, [modalProperties]);

  const handleSubmit = (event: any) => {
    if (formRef.current.check()) {
      switch (modalProperties?.modalType) {
        case ModalType.CreateElement:
          createElement.mutate();
          break;
        case ModalType.EditElement:
          editElement.mutate();
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

  return (
    <Modal id="newTab" show={modalProperties != null}>
      <Modal.Header closeButton>
        <Modal.Title>{title()}</Modal.Title>
      </Modal.Header>
      <Form model={model} onSubmit={handleSubmit} ref={formRef}>
        <Modal.Body>
          <ElementTitleInput state={{ value: element, set: setElement }} />
          <ElementTypeInput state={{ value: element, set: setElement }} parent={activeModalData.value?.parent} />
          <CustomElementInputs state={{ value: element, set: setElement }} />
        </Modal.Body>
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
