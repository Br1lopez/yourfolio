import { useState, useEffect, useContext } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import "./navBar.scss";
import { TabModal } from "../modals/TabModal";
import Tab from "./components/Tab";
import { PortfolioContext } from "../../context/PortfolioContext";
import { ModalType } from "../../context/PortfolioContextTypes";
import { ElementDTO } from "src/api/dtoTypes";

//TODO transiciones al borrar y añadir pestañas
interface NavBarProps {
  tabs: ElementDTO[];
  height?: string;
}

export const NavBar = (props: NavBarProps) => {
  const [showTabmenu, setShowTabmenu] = useState<any>([]);
  const { tabs, height } = props;

  const {
    activeModalData: activeModalProps,
    portfolioId,
    portfolioData,
  } = useContext(PortfolioContext);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target.id.includes("navbar__tabLink")) {
        const index = Number(target.id.replace("navbar__tabLink_", ""));
        setShowTabmenu(tabs.map((section, i) => i === index));
      } else {
        closeAllTabMenus();
      }
    };

    const closeAllTabMenus = () => {
      setShowTabmenu(tabs.map(() => false));
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", closeAllTabMenus);

    closeAllTabMenus();

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", closeAllTabMenus);
    };
  }, [portfolioData.value.elements]);

  return (
    <>
      <Navbar
        expand="sm"
        id="navbar"
        className="navbar"
        style={{
          backgroundColor: portfolioData.value.style.bgColor,
          height: height,
        }}
      >
        <Navbar.Brand className="navbar__brand" href="index.html">
          {portfolioData.value.name}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navCollapse"
          className="navbar__collapseButton"
        />
        <Navbar.Collapse className="justify-content-end" id="navCollapse">
          <Nav>
            {portfolioData.value.elements
              .sort((a: any, b: any) => a.position - b.position)
              .map((tab, index) => {
                return (
                  <Tab
                    open={showTabmenu[index]}
                    key={index}
                    element={tab}
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
                    modalType: ModalType.CreateElement,
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
