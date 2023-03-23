import { useState } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import "./navBar.scss";
import { NewTabModal } from "./NewTabModal";


export const NavBar = ({title, sections}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="sm" id="navbar">
        <Navbar.Brand href="index.html">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navCollapse" />
        <Navbar.Collapse className="justify-content-end" id="navCollapse">
          <Nav>
            {sections?.map((section) => {
              return <Nav.Link href="#">{section}</Nav.Link>;
            })}
            <Nav.Link href="#">
              <Button className="addTab" variant="link" onClick={handleShow}>
                <i
                  className="fas fa-plus-circle"
                  style={{ fontSize: "1.5em", color: "red"  }}
                ></i>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <NewTabModal show={show} onClose={handleClose}></NewTabModal>
    </>
  );
};
