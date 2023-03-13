
import { useState } from "react";
import { Modal, Navbar, Button, Nav, Form, CloseButton } from "react-bootstrap";

interface NavBarProps {
  title: string;
}

export const NavBar = (props: NavBarProps) => {
  const [show, setShow] = useState<boolean>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="sm" id="navbar">
        <Navbar.Brand
          href="index.html"
          data-toggle="popover"
          data-trigger="focus"
          data-placement="bottom"
        >
          {props.title}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarNavDropdown"
        />
        <Navbar.Collapse  className="justify-content-end" id="navbarNavDropdown">
          <Nav>
            <Nav.Item
            >
              <Nav.Link href="#">
                <Button variant="link" onClick={handleShow}>
                  <i
                    className="fas fa-plus-circle"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        id="newTab"
        aria-labelledby="exampleModalLabel"
        show={show}
        onHide={handleClose}
      >
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
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Crear pestaña
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
