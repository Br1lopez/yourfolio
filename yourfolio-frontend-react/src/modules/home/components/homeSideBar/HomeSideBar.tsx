import React, { useContext } from "react";
import "./homeSideBar.scss";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { PortfolioContext } from "../../../../hooks/PortfolioContext";
import { ModalType } from "../../../../types/portfolioContextTypes";

export const HomeSidebar = () => {
  const { modalWindowData } = useContext(PortfolioContext);
  const handleStyleClick = (e: any) => {
    e.preventDefault();
    modalWindowData.set({
      ...modalWindowData.value,
      modalType: ModalType.SetSyle,
    });
  };
  return (
    <div className="yourfolio-home__sidebar">
      {/* <AiOutlineMenu className="i-bar__icon top" style={{ width: "30px", height: "30px", color: "white" }}/> */}
      <FaPaintBrush
        className="yourfolio-home__sidebar"
        onClick={handleStyleClick}
      />
      <MdOutlineHelp className="yourfolio-home__sidebar" />
    </div>
  );
};
