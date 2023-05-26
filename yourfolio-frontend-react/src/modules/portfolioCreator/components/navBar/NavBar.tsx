import { useState, useEffect, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./navBar.scss";
import Tab from "./components/Tab";
import { ModalType } from "../../../../types/portfolioContextTypes";
import { ElementDTO } from "src/types/dtoTypes";
import { PortfolioContext } from "../../../../hooks/PortfolioContext";
import { FaPlusCircle } from "react-icons/fa";

//TODO transiciones al borrar y añadir pestañas
interface NavBarProps {
  portfolio: ElementDTO;
  height?: string;
}

export const NavBar = (props: NavBarProps) => {
  const { portfolio, height } = props;
  const { modalWindowData } = useContext(PortfolioContext);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target.id.includes("navbar__tabLink")) {
        setActiveTab(Number(target.id.replace("navbar__tabLink_", "")));
      } else {
        setActiveTab(null);
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
                <Tab
                  open={activeTab == tab.id}
                  key={index}
                  element={tab}
                  parentId={portfolio.id}
                ></Tab>
              );
            })}
          <Nav.Link
            href="#"
            className="navbar__addTabButton"
            onClick={() => {
              modalWindowData.set({
                ...modalWindowData.value,
                parentId: portfolio.id,
                elementId: 0,
                modalType: ModalType.CreateElement,
              });
            }}
          >
            <FaPlusCircle />
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
