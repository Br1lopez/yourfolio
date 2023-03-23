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
      <Navbar expand="sm" id="navbar" className="navbar">
        <Navbar.Brand className="navbar__brand" href="index.html">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navCollapse" className="navbar__collapseButton"/>
        <Navbar.Collapse className="justify-content-end" id="navCollapse">
          <Nav>
            {props.sections?.map((section) => {
              return <Nav.Link className="navbar__tabLink" href="#">{section}</Nav.Link>;
            })}
            <Nav.Link href="#">
              <Button className="navbar__addTabButton" variant="link" onClick={handleShow}>
                <i className="fas fa-plus-circle"></i>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <NewTabModal show={show} onClose={handleClose}></NewTabModal>
    </>
  );
};

NavBar.defaultProps = {
  title: "Yourfolio",
  sections: [],
};
