import React, { useContext } from "react";
import "./interfaceBar.scss";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { ModalType, PortfolioContext } from "../../context/PortfolioContext";
import { StyleModal } from "../modals/StyleModal";

interface InterfaceBarProps {
  width?: string;
}

const InterfaceBar = (props: InterfaceBarProps) => {
  const { activeModalData } = useContext(PortfolioContext);
  const handleStyleClick = (e: any) => {
    e.preventDefault();
    activeModalData.set({
      parentId: null,
      elementId: null,
      modalType: ModalType.SetSyle,
    });
  };
  return (
    <>
      <StyleModal />
      <div className="i-bar" style={{ width: props.width }}>
        {/* <AiOutlineMenu className="i-bar__icon top" style={{ width: "30px", height: "30px", color: "white" }}/> */}
        <FaPaintBrush className="i-bar__icon" onClick={handleStyleClick} />
        <MdOutlineHelp className="i-bar__icon" />
      </div>
    </>
  );
};

export default InterfaceBar;
