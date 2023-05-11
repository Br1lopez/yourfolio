import React, { useContext, useRef } from "react";
import { Modal } from "react-bootstrap";
import { createElement, updateElement } from "src/api/element";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EMPTY_MODAL_CONTENT,
  ModalType,
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

  const createElementMutation = useMutation({
    mutationFn: () =>
      createElement(activeModalData.value.parentId || portfolioId.value, {
        name: activeModalData.value.modalContent?.name,
        typeId: activeModalData.value.modalContent?.elementType,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      toaster.push(
        <Notification>
          <NotificationContent
            text={`Pestaña "${activeModalData.value.modalContent?.name}" creada con éxito`}
          />
        </Notification>,
        defaultToastValues
      );
    },
  });

  const editElementMutation = useMutation({
    mutationFn: () =>
      updateElement(activeModalData.value.elementId || -1, {
        name: activeModalData.value.modalContent?.name,
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

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired('This field is required.'),
    type: Schema.Types.StringType().isRequired('Please enter a valid email address.')
  });

  const handleSubmit = (event: any) => {
    if (formRef.current.check()) {
      switch (activeModalData.value.modalType) {
        case ModalType.CreateElement:
          createElementMutation.mutate();
          break;
        case ModalType.EditElement:
          editElementMutation.mutate();
          break;
      }
      handleClose();
    }

  };

  const handleClose = () => {
    activeModalData.set({
      parentId: null,
      elementId: null,
      modalType: null,
      modalContent: null,
    });
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
      onHide={handleClose}
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
              value={activeModalData.value.modalContent?.name}
              onChange={(v: string, e: any) =>
                activeModalData.set({
                  ...activeModalData.value,
                  modalContent: {
                    ...(activeModalData.value.modalContent ||
                      EMPTY_MODAL_CONTENT),
                    name: v || "",
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="newElementType">
            <Form.ControlLabel>Tipo de elemento:</Form.ControlLabel>
            <Form.Control
              name="type"
              accepter={SelectPicker}
              searchable={false}
              aria-label="Select"
              value={activeModalData.value.modalContent?.elementType}
              onChange={(v: any, e: any) =>
                activeModalData.set({
                  ...activeModalData.value,
                  modalContent: {
                    ...(activeModalData.value.modalContent ||
                      EMPTY_MODAL_CONTENT),
                    elementType: v || "",
                  },
                })
              }
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
          })}
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button appearance="default" onClick={handleClose}>
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
