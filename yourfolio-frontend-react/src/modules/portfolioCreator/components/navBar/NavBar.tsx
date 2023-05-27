import { useState, useEffect, useContext } from "react";
import "./navBar.scss";
import Tab from "./components/Tab";
import { ModalType } from "../../../../types/portfolioContextTypes";
import { ElementDTO } from "src/types/dtoTypes";
import { PortfolioContext } from "../../../../hooks/PortfolioContext";
import { FaBars, FaPlusCircle, FaTimes } from "react-icons/fa";

//TODO transiciones al borrar y añadir pestañas
interface NavBarProps {
  portfolio: ElementDTO;
}

export const NavBar = (props: NavBarProps) => {
  const { portfolio } = props;
  const { modalWindowData, editMode, activeElementId } = useContext(PortfolioContext);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [dropdownClick, setDropdownClick] = useState(false);

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
    <nav
      id="navbar"
      className={dropdownClick ? "navbar" : "navbar dropdown"}
    >
      <div className="navbar__content">
        <div className="navbar__content__brand"
          onClick={() => { activeElementId.set(portfolio.elements.find((e) => e.home)?.id || -1) }}>
          {portfolio.name}
        </div>

        {portfolio.elements
          .sort((a: any, b: any) => a.position - b.position)
          .map((tab, index) => {
            return (
              <Tab
                open={activeTab === tab.id}
                key={index}
                element={tab}
                parentId={portfolio.id}
              ></Tab>
            );
          })}

        {editMode.value && (
          <div
            className="navbar__content__addTabButton"
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
          </div>)}
      </div>
      <div className="navbar__dropdownIcon" onClick={() => { setDropdownClick(!dropdownClick) }}>
        {dropdownClick ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  title: "Yourfolio",
  sections: [],
};
