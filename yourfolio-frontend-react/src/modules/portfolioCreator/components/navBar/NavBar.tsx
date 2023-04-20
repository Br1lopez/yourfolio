import { useState, useEffect, useContext } from "react";
import { Navbar, Button, Nav, OverlayTrigger } from "react-bootstrap";
import "./navBar.scss";
import { TabModal } from "../modals/TabModal";
import Tab from "./components/Tab";
import { PortfolioContext, ModalType } from "../../context/PortfolioContext";
import { useQueryClient } from "@tanstack/react-query";

interface NavBarProps {
  title: string;
  tabs?: { name: string; id: number }[];
}

export const NavBar = (props: NavBarProps) => {
  const [showTabmenu, setShowTabmenu] = useState<any>([]);
  const queryClient = useQueryClient();

  const { activeModalData: activeModalProps, portfolioId } =
    useContext(PortfolioContext);

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
                  tabId={tab.id}
                ></Tab>
              );
            })}
            <Nav.Link href="#">
              <Button
                className="navbar__addTabButton"
                variant="link"
                onClick={() => {
                  activeModalProps.set({
                    parentId: portfolioId.value,
                    elementId: 0,
                    type: ModalType.CreateElement,
                  });
                }}
              >
                <i className="fas fa-plus-circle"></i>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <TabModal></TabModal>
    </>
  );
};

NavBar.defaultProps = {
  title: "Yourfolio",
  sections: [],
};
