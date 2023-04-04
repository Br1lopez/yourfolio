import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API_PORT } from '../../../../../globals';

interface newTabModalProps {
  show: boolean;
  onClose: () => void;
}

export const NewTabModal = (props: newTabModalProps) => {

  const [name, setName] = useState<string>("");

  const handleNameInputChange = (event: any) => {
    setName(event.target.value);
  };

const onSubmit = () => {
  axios
  .post(`http://localhost:${API_PORT}/portfolios/1/tabs`,
  {
    name: name,
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
            <Form.Control type="text" onChange={handleNameInputChange}  required />
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
