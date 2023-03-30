import axios from "axios";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface newTabModalProps {
  show: boolean;
  onClose: () => void;
}

export const NewTabModal = (props: newTabModalProps) => {

const onSubmit = () => {
  axios
  .post("http://localhost:8081/portfolios/1/tabs",
  {
    name: "Tab 1",
  })
  .catch((error) => {
    console.log(error);
  });
}

  return (
    <Modal id="newTab" show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear pestaña</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="newTabTitle" className="mb-4">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" onClick={onSubmit}>
            Crear pestaña
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
