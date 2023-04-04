import { useState } from "react";
import { Navbar, Button, Nav, OverlayTrigger } from "react-bootstrap";
import "./navBar.scss";
import { NewTabModal } from "./NewTabModal";
import "rsuite/dist/rsuite.min.css";
import { Popover, Whisper } from "rsuite";
import { Dropdown } from "rsuite";

interface NavBarProps {
  title: string;
  sections?: string[];
}

export const NavBar = (props: NavBarProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="sm" id="navbar" className="navbar">
        <Navbar.Brand className="navbar__brand" href="index.html">
          {props.title}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navCollapse"
          className="navbar__collapseButton"
        />
        <Navbar.Collapse className="justify-content-end" id="navCollapse">
          <Nav>
            {props.sections?.map((section) => {
              return (
                <Whisper
                trigger="contextMenu"
                  speaker={
                    <Popover title="Geeks Menu">
                      <Dropdown.Menu>
                        <Dropdown.Item>New File</Dropdown.Item>
                        <Dropdown.Item>
                          New File with Current Profile
                        </Dropdown.Item>
                        <Dropdown.Item>Download As...</Dropdown.Item>
                        <Dropdown.Item>Export PDF</Dropdown.Item>
                      </Dropdown.Menu>
                    </Popover>
                  }
                >
                  <Nav.Link
                    className="navbar__tabLink"
                    href="#"
                  >
                    {section}
                  </Nav.Link>
                </Whisper>
              );
            })}
            <Nav.Link href="#">
              <Button
                className="navbar__addTabButton"
                variant="link"
                onClick={handleShow}
              >
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
