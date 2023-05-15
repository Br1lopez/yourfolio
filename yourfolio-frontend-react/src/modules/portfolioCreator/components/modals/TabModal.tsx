import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { createElement, updateElement } from "src/api/element";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ModalType,
  NULL_MODAL_DATA,
  PortfolioContext,
} from "src/modules/portfolioCreator/context/PortfolioContext";
import {
  NotificationContent,
  defaultToastValues,
} from "../notifications/CloudNotification";
import {
  Notification,
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

export const TabModal = () => {
  const {
    activeModalData,
    portfolioId,
    toaster,
    portfolioData,
    activeElementId,
  } = useContext(PortfolioContext);

  const queryClient = useQueryClient();
  const formRef = useRef<any>(null);
  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();
  const createElement = useCreateElementMutation({ name, typeId: type });

  useEffect(() => {
    if (activeModalData.value.modalContent) {
      setName(activeModalData.value.modalContent.name);
      setType(activeModalData.value.modalContent.elementType);
    }
  }, [activeModalData.value.modalContent]);

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired("This field is required."),
    type: Schema.Types.StringType().isRequired(
      "Please enter a valid email address."
    ),
  });

  const editElementMutation = useMutation({
    mutationFn: () =>
      updateElement(activeModalData.value.elementId || -1, {
        name: name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      toaster.push(
        <Notification>
          <NotificationContent
            text={`Pestaña "${activeModalData.value.modalContent?.name}" modificada con éxito`}
          ></NotificationContent>
        </Notification>,
        defaultToastValues
      );
    },
  });

  const handleSubmit = (event: any) => {
    if (formRef.current.check()) {
      switch (activeModalData.value.modalType) {
        case ModalType.CreateElement:
          createElement.mutate();
          break;
        case ModalType.EditElement:
          editElementMutation.mutate();
          break;
      }
      activeModalData.set(NULL_MODAL_DATA);
    }
  };

  const title = () => {
    switch (activeModalData.value.modalType) {
      case ModalType.CreateElement:
        return "Nuevo elemento";
      case ModalType.EditElement:
        return "Editar elemento";
    }
  };

  return (
    <Modal
      id="newTab"
      show={
        activeModalData.value.parentId != null ||
        activeModalData.value.elementId != null
      }
    >
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
                getElementByIdRecursive(
                  activeModalData.value.parentId || activeElementId.value,
                  portfolioData.value
                )?.type.possibleChildren?.map((element) => ({
                  label: element.name,
                  value: element.id,
                })) || []
              }
            ></Form.Control>
          </Form.Group>
          {getCustomInputs(
            activeModalData.value.modalContent?.elementType || ""
          ).map((input) => {
            switch (input) {
              case CustomInputType.Image:
                return (
                  <Form.Group controlId="newElementType" className="mb-4">
                    <Form.ControlLabel>Imagen:</Form.ControlLabel>
                    <Form.Control name="image" accepter={Uploader} action="#" />
                  </Form.Group>
                );
              default:
                return null;
            }
          })}
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              appearance="default"
              onClick={() => activeModalData.set(NULL_MODAL_DATA)}
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
