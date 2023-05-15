import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { PortfolioContext } from "src/modules/portfolioCreator/context/PortfolioContext";

import {
  Form,
  ButtonToolbar,
  Button,
  Uploader,
  SelectPicker,
  Schema,
} from "rsuite";
import "./modal.scss";
import { getElementByIdRecursive } from "src/utils/functions";
import {
  CustomInputType,
  getCustomInputs,
} from "src/modules/portfolioCreator/components/modals/components/customInputs";
import { useCreateElementMutation } from "src/api/mutations";
import {
  ActiveModalDataGetter,
  ModalType,
} from "../../context/PortfolioContextTypes";

export interface ModalWindowProps {
  modalProperties: ActiveModalDataGetter;
}

export const ModalWindow = (props: ModalWindowProps) => {
  const { activeModalData } = useContext(PortfolioContext);
  const { modalProperties } = props;

  const formRef = useRef<any>(null);
  const [parentId, setParentId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const createElement = useCreateElementMutation(
    {
      name,
      typeId: type,
    },
    parentId
  );
  const editElement = useCreateElementMutation(
    {
      name,
      typeId: type,
    },
    parentId
  );

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired("This field is required."),
    type: Schema.Types.StringType().isRequired(
      "Please enter a valid email address."
    ),
  });

  const handleSubmit = (event: any) => {
    if (formRef.current.check()) {
      switch (modalProperties.modalType) {
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
    switch (modalProperties.modalType) {
      case ModalType.CreateElement:
        return "Nuevo elemento";
      case ModalType.EditElement:
        return "Editar elemento";
    }
  };

  return (
    <Modal id="newTab" show={modalProperties.element != null}>
      <Modal.Header closeButton>
        <Modal.Title>{title()}</Modal.Title>
      </Modal.Header>
      <Form model={model} onSubmit={handleSubmit} ref={formRef}>
        <Modal.Body>
          <Form.Group controlId="newElementTitle">
            <Form.ControlLabel>Nombre:</Form.ControlLabel>
            <Form.Control
              name="name"
              value={name}
              onChange={(v: string, e: any) => setName(v)}
            />
          </Form.Group>
          <Form.Group controlId="newElementType">
            <Form.ControlLabel>Tipo de elemento:</Form.ControlLabel>
            <Form.Control
              name="type"
              accepter={SelectPicker}
              searchable={false}
              aria-label="Select"
              value={type}
              onChange={(v: any, e: any) => setType(v)}
              data={
                modalProperties.element?.type.possibleChildren?.map(
                  (possibleChild) => ({
                    label: possibleChild.name,
                    value: possibleChild.id,
                  })
                ) || []
              }
            ></Form.Control>
          </Form.Group>
          {getCustomInputs(modalProperties.element?.type.name || "").map(
            (input) => {
              switch (input) {
                case CustomInputType.Image:
                  return (
                    <Form.Group controlId="newElementType" className="mb-4">
                      <Form.ControlLabel>Imagen:</Form.ControlLabel>
                      <Form.Control
                        name="image"
                        accepter={Uploader}
                        action="#"
                      />
                    </Form.Group>
                  );
                default:
                  return null;
              }
            }
          )}
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
