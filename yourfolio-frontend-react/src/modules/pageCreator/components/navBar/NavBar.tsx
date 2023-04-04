import { useState, useEffect } from "react";
import { Navbar, Button, Nav, OverlayTrigger } from "react-bootstrap";
import "./navBar.scss";
import { NewTabModal } from "./components/NewTabModal";
import Tab from "./components/Tab";

interface NavBarProps {
  title: string;
  tabs?: { name: string; index: number }[];
}

export const NavBar = (props: NavBarProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showTabmenu, setShowTabmenu] = useState<any>([]);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target.id.includes("navbar__tabLink")) {
        const index = Number(target.id.replace("navbar__tabLink_", ""));
        setShowTabmenu(props.tabs?.map((section, i) => i === index));
      } else {
        closeAllTabMenus();
      }
    };

    const closeAllTabMenus = () => {
      setShowTabmenu(props.tabs?.map(() => false));
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", closeAllTabMenus);

    closeAllTabMenus();

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", closeAllTabMenus);
    };
  }, [props.tabs]);

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
            {props.tabs?.map((tab, index) => {
              return (
                <Tab
                  name={tab.name}
                  open={showTabmenu[index]}
                  index={index}
                  key={index}
                  tabId={tab.index}
                ></Tab>
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
