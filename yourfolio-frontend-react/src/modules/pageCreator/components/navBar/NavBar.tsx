import { useState } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import "./navBar.scss";
import { NewTabModal } from "./NewTabModal";

interface NavBarProps {
  title: string;
  sections?: string[];
  bgColor?: string;
  textColor?: string;
}

export const NavBar = (props: NavBarProps) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        expand="sm"
        id="navbar"
        style={{
          backgroundColor: `${props.bgColor}`,
        }}
      >
        <Navbar.Brand href="index.html">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navCollapse" />
        <Navbar.Collapse className="justify-content-end" id="navCollapse">
          <Nav>
            {props.sections?.map((section) => {
              return (
                <Nav.Link
                  href="#"
                  style={{
                    color: `${props.textColor}`,
                  }}
                >
                  {section}
                </Nav.Link>
              );
            })}
            <Nav.Link href="#">
              <Button className="addTab" variant="link" onClick={handleShow}>
                <i
                  className="fas fa-plus-circle"
                  style={{
                    fontSize: "1.5em",
                    color: `${props.textColor}`,
                  }}
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

NavBar.defaultProps = {
  title: "Yourfolio",
  sections: [],
  bgColor: "#88719e",
  textColor: "#bdabab",
};
