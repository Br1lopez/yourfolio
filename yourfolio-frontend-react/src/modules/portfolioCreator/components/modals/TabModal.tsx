import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createElementRequest, updateElementRequest } from "src/api/elementRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ModalType,
  PortfolioContext,
} from "src/modules/portfolioCreator/context/PortfolioContext";
import {
  NotificationContent,
  defaultToastValues,
} from "../notifications/CloudNotification";
import { Notification } from "rsuite";
import { createElement } from "src/api/elementActions";

export const TabModal = () => {
  const [name, setName] = useState<string>("");
  const { activeModalData, portfolioId, toaster, queryClient } =
    useContext(PortfolioContext);

  const ctx = useContext(PortfolioContext);

  const handleNameInputChange = (event: any) => {
    setName(event.target.value);
  };

  const editElementMutation = useMutation({
    mutationFn: () =>
      updateElementRequest(activeModalData.value.elementId || -1, { name: name }),
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

  const handleClick = (event: any) => {
    event.preventDefault();
    switch (activeModalData.value.type) {
      case ModalType.Create:
        createElement(ctx, {name: name, type: "tab"}, portfolioId.value, `Pestaña "${name}" creada con éxito`, handleClose);
      case ModalType.Edit:
        return editElementMutation.mutate();
    }
  };

  const handleClose = () => {
    activeModalData.set({ parentId: null, elementId: null, type: null });
  };

  const title = () => {
    switch (activeModalData.value.type) {
      case ModalType.Create:
        return "Crear pestaña";
      case ModalType.Edit:
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
      <Form>
        <Modal.Body>
          <Form.Group controlId="newTabTitle" className="mb-4">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleNameInputChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" onClick={handleClick}>
            {title()}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
