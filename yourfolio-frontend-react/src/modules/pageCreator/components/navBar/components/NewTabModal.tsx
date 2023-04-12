import axios from "axios";
import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createElement } from "../../../../../api/element";
import { useMutation } from "@tanstack/react-query";
import { PortfolioContext } from "src/modules/pageCreator/PageCreator";

interface newTabModalProps {
  show: boolean;
  onClose: () => void;
}

export const NewTabModal = (props: newTabModalProps) => {

  const [name, setName] = useState<string>("");
  const { portfolioId } = useContext(PortfolioContext);

  const handleNameInputChange = (event: any) => {
    setName(event.target.value);
  };

  const createElementMutation = useMutation({
    mutationFn: () => createElement(portfolioId.portfolioId, {name: name, type: "tab"})
  });

  const handleClick = (event: any) => {
    event.preventDefault();
    createElementMutation.mutate();
    window.location.reload();
  };

  return (
    <Modal id="newTab" show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear pestaña</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="newTabTitle" className="mb-4">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" onChange={handleNameInputChange}  required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" onClick={handleClick}>
            Crear pestaña
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
