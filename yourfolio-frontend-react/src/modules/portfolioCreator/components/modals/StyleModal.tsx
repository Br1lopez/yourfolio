import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
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
import "./modal.scss";
import { throttle } from "lodash";

export const StyleModal = () => {
  const THROTTLE_MS = 100;
  const ctx = useContext(PortfolioContext);
  const { activeModalData, portfolioId, toaster, portfolioData } =
    useContext(PortfolioContext);

  const debouncedBgColor = throttle((bgColor) => {
    let data = { ...portfolioData.value };
    data.style.bgColor = bgColor;
    portfolioData.set(data);
  }, THROTTLE_MS);

  const debouncedFontColor = throttle((fontColor) => {
    let data = { ...portfolioData.value };
    data.style.fontColor = fontColor;
    portfolioData.set(data);
  }, THROTTLE_MS);

  const handleBgColorInputChange = (event: any) => {
    debouncedBgColor(event.target.value);
  };

  const handleFontColorInputChange = (event: any) => {
    debouncedFontColor(event.target.value);
  };

  const queryClient = useQueryClient();

  const editStyleMutation = useMutation({
    mutationFn: () =>
      updateElement(portfolioId.value, {
        ...portfolioData.value,
        style: {
          ...portfolioData.value.style,
          bgColor: portfolioData.value.style.bgColor,
          fontColor: portfolioData.value.style.fontColor,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      toaster.push(
        <Notification>
          <NotificationContent
            text={`Estilo modificado con éxito`}
          ></NotificationContent>
        </Notification>,
        defaultToastValues
      );
      handleClose();
    },
  });
  const handleClick = (event: any) => {
    event.preventDefault();
    editStyleMutation.mutate();
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
      backdrop={false}
      centered={true}
      className="style-modal"
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
              onChange={handleBgColorInputChange}
              value={portfolioData.value.style.bgColor || "#ffffff"}
              required
            />
          </Form.Group>
          <Form.Group controlId="newTabTitle" className="mb-4">
            <Form.Label>Color de texto:</Form.Label>
            <Form.Control
              type="color"
              onChange={handleFontColorInputChange}
              value={portfolioData.value.style.fontColor || "#ffffff"}
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
