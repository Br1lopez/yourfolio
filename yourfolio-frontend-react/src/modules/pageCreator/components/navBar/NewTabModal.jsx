import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface newTabModalProps {
  show: boolean;
  onClose: () => void;
}

export const NewTabModal = (props: newTabModalProps) => {
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
          <Button type="submit" variant="primary">
            Crear pestaña
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
