import { useState, useEffect } from "react";
import { Navbar, Button, Nav, OverlayTrigger } from "react-bootstrap";
import "./navBar.scss";
import { NewTabModal } from "./components/NewTabModal";
import Tab from "./components/Tab";

interface NavBarProps {
  title: string;
  sections?: string[];
}

export const NavBar = (props: NavBarProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showTabmenu, setShowTabmenu] = useState<any>([]);

  useEffect(() => {
    setShowTabmenu(props.sections?.map((section) => false));
  }, [props.sections]);

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
            {props.sections?.map((section, index) => {
              return <Tab name={section} open={showTabmenu[index]}></Tab>;
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
