import { useState, useEffect, useContext } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import "./navBar.scss";
import Tab from "./components/Tab";
import { ModalType } from "../../context/PortfolioContextTypes";
import { ElementDTO } from "src/api/dtoTypes";
import { PortfolioContext } from "../../context/PortfolioContext";

//TODO transiciones al borrar y añadir pestañas
interface NavBarProps {
  portfolio: ElementDTO;
  height?: string;
}

export const NavBar = (props: NavBarProps) => {
  const { portfolio, height } = props;
  const { activeModalData, portfolioData } = useContext(PortfolioContext);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target.id.includes("navbar__tabLink")) {
        setActiveTab(Number(target.id.replace("navbar__tabLink_", "")));
      } else {
        setActiveTab(null)
      }
    };


    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", () => setActiveTab(null));


    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", () => setActiveTab(null));
    };
  }, [portfolio]);

  return (
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
        {portfolio.name}
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navCollapse"
        className="navbar__collapseButton"
      />
      <Navbar.Collapse className="justify-content-end" id="navCollapse">
        <Nav>
          {portfolio.elements
            .sort((a: any, b: any) => a.position - b.position)
            .map((tab, index) => {
              return (
                <Tab open={activeTab == tab.id} key={index} element={tab}></Tab>
              );
            })}
          <Nav.Link href="#">
            <Button
              className="navbar__addTabButton"
              variant="link"
              onClick={() => {
                activeModalData.set({
                  parentId: portfolio.id,
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
  );
};

NavBar.defaultProps = {
  title: "Yourfolio",
  sections: [],
};
