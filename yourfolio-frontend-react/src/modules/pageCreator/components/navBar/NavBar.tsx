import { useState } from "react";
import { Navbar, Button, Nav, Popover, OverlayTrigger } from "react-bootstrap";
import "./navBar.scss";
import { NewTabModal } from "./NewTabModal";

interface NavBarProps {
  title: string;
  sections?: string[];
}

export const NavBar = (props: NavBarProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPopover, setShowPopover] = useState(false);

  const handleContextMenu = (e: any) => {
    setShowPopover(true);
    e.preventDefault();
  };

  const handlePopoverClose = (e: any) => {
    setShowPopover(false);
    e.preventDefault();
  };

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
                <Nav.Link
                  className="navbar__tabLink"
                  href="#"
                  onContextMenu={handleContextMenu}
                >
                  {section}
                  <OverlayTrigger
                    show={showPopover}
                    trigger="click"
                    placement="right"
                    overlay={
                      <Popover>
                        <Popover.Body>
                          <div className="action-buttons-container">
                            <span className="action-button">
                              <i
                                className="fas fa-edit"
                                onClick={() => {
                                  // Handle edit click here
                                  setShowPopover(false);
                                }}
                              ></i>
                            </span>
                            <span className="action-button">
                              <i
                                className="fas fa-trash-alt"
                                onClick={() => {
                                  // Handle delete click here
                                  setShowPopover(false);
                                }}
                              ></i>
                            </span>
                          </div>
                        </Popover.Body>
                      </Popover>
                    }
                    rootClose={true}
                    // onHide={handlePopoverClose}
                  >
                    <Button variant="link"></Button>
                  </OverlayTrigger>
                </Nav.Link>
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
