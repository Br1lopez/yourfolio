import { useState } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import "./navBar.scss";
import { NewTabModal } from "./NewTabModal";

interface NavBarProps {
  title: string;
  sections?: string[];
}

export const NavBar = (props: NavBarProps) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="sm" id="navbar">
        <Navbar.Brand href="index.html">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navCollapse" />
        <Navbar.Collapse className="justify-content-end" id="navCollapse">
          <Nav>
            {props.sections?.map((section) => {
              return <Nav.Link href="#">{section}</Nav.Link>;
            })}
            <Nav.Link href="#">
              <Button className="addTab" variant="link" onClick={handleShow}>
                <i
                  className="fas fa-plus-circle"
                  style={{ fontSize: "1.5em" }}
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
