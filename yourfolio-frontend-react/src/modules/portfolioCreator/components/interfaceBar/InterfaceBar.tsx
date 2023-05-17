import React, { useContext } from "react";
import "./interfaceBar.scss";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { PortfolioContext } from "../../../../hooks/PortfolioContext";
import { ModalType } from "../../../../types/portfolioContextTypes";

interface InterfaceBarProps {
  width?: string;
}

export const InterfaceBar = (props: InterfaceBarProps) => {
  const { modalWindowData } = useContext(PortfolioContext);
  const handleStyleClick = (e: any) => {
    e.preventDefault();
    modalWindowData.set({
      modalType: ModalType.SetSyle,
    });
  };
  return (

    <div className="i-bar" style={{ width: props.width }}>
      {/* <AiOutlineMenu className="i-bar__icon top" style={{ width: "30px", height: "30px", color: "white" }}/> */}
      <FaPaintBrush className="i-bar__icon" onClick={handleStyleClick} />
      <MdOutlineHelp className="i-bar__icon" />
    </div>

  );
};
