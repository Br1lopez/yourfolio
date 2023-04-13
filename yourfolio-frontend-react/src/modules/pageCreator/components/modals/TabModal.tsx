import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createElement, updateElement } from "../../../../api/element";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ModalType,
  PortfolioContext,
} from "src/modules/pageCreator/PageCreator";

export const TabModal = () => {
  const [name, setName] = useState<string>("");
  const { activeModalData, portfolioId } = useContext(PortfolioContext);

  const handleNameInputChange = (event: any) => {
    setName(event.target.value);
  };
  const queryClient = useQueryClient();

  const createElementMutation = useMutation({
    mutationFn: () => createElement(portfolioId, { name: name, type: "tab" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId]);
      handleClose();
    },
  });

  const editElementMutation = useMutation({
    mutationFn: () =>
      updateElement(activeModalData.value.elementId, { name: name }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId]);
      handleClose();
    },
  });

  const handleClick = (event: any) => {
    event.preventDefault();
    switch (activeModalData.value.type) {
      case ModalType.Create:
        createElementMutation.mutate();
        break;
      case ModalType.Edit:
        editElementMutation.mutate();
        break;
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