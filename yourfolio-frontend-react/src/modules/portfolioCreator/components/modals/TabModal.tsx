import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { createElement, updateElement } from "src/api/element";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
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
} from "rsuite";
import "./modal.scss";
import { getElementByIdRecursive } from "src/utils/functions";
import {
  CustomInputType,
  getCustomInputs,
} from "src/modules/portfolioCreator/components/modals/components/customInputs";

export const TabModal = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const {
    activeModalData,
    portfolioId,
    toaster,
    portfolioData,
    activeElementId,
  } = useContext(PortfolioContext);

  const queryClient = useQueryClient();

  const createElementMutation = useMutation({
    mutationFn: () =>
      createElement(activeModalData.value.parentId || portfolioId.value, {
        name: name,
        typeId: type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      toaster.push(
        <Notification>
          <NotificationContent text={`Pestaña "${name}" creada con éxito`} />
        </Notification>,
        defaultToastValues
      );
      handleClose();
    },
  });

  const editElementMutation = useMutation({
    mutationFn: () =>
      updateElement(activeModalData.value.elementId || -1, { name: name }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      toaster.push(
        <Notification>
          <NotificationContent
            text={`Pestaña "${name}" modificada con éxito`}
          ></NotificationContent>
        </Notification>,
        defaultToastValues
      );
      handleClose();
    },
  });

  const handleSubmit = (event: any) => {
    console.log("e", name, type);

    switch (activeModalData.value.modalType) {
      case ModalType.CreateElement:
        createElementMutation.mutate();
        break;
      case ModalType.EditElement:
        editElementMutation.mutate();
        break;
    }
  };

  const handleClose = () => {
    activeModalData.set({ parentId: null, elementId: null, modalType: null });
  };

  const title = () => {
    switch (activeModalData.value.modalType) {
      case ModalType.CreateElement:
        return "Crear pestaña";
      case ModalType.EditElement:
        return "Editar pestaña";
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
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="newElementTitle" className="mb-4">
            <Form.ControlLabel>Nombre:</Form.ControlLabel>
            <Form.Control
              name="input"
              value={name}
              onChange={(v: string, e: any) => setName(v)}
              required
            />
          </Form.Group>
          <Form.Group controlId="newElementType" className="mb-4">
            <Form.ControlLabel>Tipo de elemento:</Form.ControlLabel>
            <Form.Control
              name="selectPicker"
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
            >
              <option value=""></option>
              {getElementByIdRecursive(
                activeModalData.value.parentId || activeElementId.value,
                portfolioData.value
              )?.type.possibleChildren?.map((element) => (
                <option value={element.id} key={element.id}>
                  {element.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {getCustomInputs(type).map((input) => {
            switch (input) {
              case CustomInputType.Image:
                return (
                  <Form.Group controlId="newElementType" className="mb-4">
                    <Form.ControlLabel>Imagen:</Form.ControlLabel>
                    <Form.Control
                      name="uploader"
                      accepter={Uploader}
                      action="#"
                    />
                  </Form.Group>
                );
            }
          })}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {title()}
          </Button> */}
          <ButtonToolbar>
            <Button appearance="default" onClick={handleClose}>
              Cancelar
            </Button>
            <Button appearance="primary" onClick={handleSubmit}>
              {title()}
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
