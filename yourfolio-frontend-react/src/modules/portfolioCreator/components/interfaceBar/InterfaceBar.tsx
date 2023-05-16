import React, { useContext } from "react";
import "./interfaceBar.scss";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { PortfolioContext } from "../../../../hooks/PortfolioContext";
import { StyleModal } from "src/components/modals/StyleModal";
import { ModalType } from "../../../../types/portfolioContextTypes";

interface InterfaceBarProps {
  width?: string;
}

const InterfaceBar = (props: InterfaceBarProps) => {
  const { modalWindowData: activeModalData } = useContext(PortfolioContext);
  const handleStyleClick = (e: any) => {
    e.preventDefault();
    activeModalData.set({
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

export default InterfaceBar;
