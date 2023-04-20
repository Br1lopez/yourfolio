import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
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
import { Notification } from "rsuite";

export const StyleModal = () => {
  const { activeModalData, portfolioId, toaster, portfolioData } =
    useContext(PortfolioContext);
  const [bgColor, setBgColor] = useState(
    portfolioData.value.style?.bgColor || "#ffffff"
  );

  const handleColorInputChange = (event: any) => {
    setBgColor(event.target.value);
  };
  const queryClient = useQueryClient();


  const handleClick = (event: any) => {
    event.preventDefault();
    portfolioData.set({
      ...portfolioData.value,
      style: { ...portfolioData.value.style, bgColor },
    });
    handleClose();
  };

  const handleClose = () => {
    activeModalData.set({ parentId: null, elementId: null, type: null });
  };

  return (
    <Modal
      id="newTab"
      show={activeModalData.value.type == ModalType.SetSyle}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar estilo</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="newTabTitle" className="mb-4">
            <Form.Label>Color de fondo:</Form.Label>
            <Form.Control
              type="color"
              onChange={handleColorInputChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" onClick={handleClick}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
