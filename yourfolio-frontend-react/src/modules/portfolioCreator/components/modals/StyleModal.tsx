import React, { useState, useContext, useEffect, useRef } from "react";
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
import { useDebounce } from "usehooks-ts";
import "./modal.scss";

function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
}

export const StyleModal = () => {
  const { activeModalData, portfolioId, toaster, portfolioData } =
    useContext(PortfolioContext);
  const [bgColor, setBgColor] = useState(
    portfolioData.value.style?.bgColor || "#ffffff"
  );
  const colorDebounced = useThrottle<string>(bgColor, 1000);

  useEffect(() => {
    portfolioData.set({
      ...portfolioData.value,
      style: {
        ...portfolioData.value.style,
        bgColor: bgColor,
      },
    });
  }, [colorDebounced]);

  //TODO use debounce
  const handleColorInputChange = (event: any) => {
    setBgColor(event.target.value);
  };
  const queryClient = useQueryClient();

  const editStyleMutation = useMutation({
    mutationFn: () =>
      updateElement(portfolioData.value.id, {
        ...portfolioData.value,
        style: { ...portfolioData.value.style, bgColor: bgColor },
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
              onChange={handleColorInputChange}
              value={colorDebounced || "#ffffff"}
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
