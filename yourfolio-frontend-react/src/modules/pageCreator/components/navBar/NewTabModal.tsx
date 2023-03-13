import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export interface NewTabModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewTabModal = (props: NewTabModalProps) => {
  return (
    <Modal id="newTab" aria-labelledby="exampleModalLabel" show={props.show}>
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
          <Button
            variant="secondary"
            onClick={() => {
              props.setShow(false);
            }}
          >
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

export default NewTabModal;
