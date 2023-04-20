import React, { useContext } from "react";
import "./interfaceBar.scss";
import { IoSettingsSharp, IoColorPaletteSharp } from "react-icons/io5";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
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
      type: ModalType.SetSyle,
    });
  };
  return (
    <>
      <StyleModal />
      <div className="i-bar" style={{ width: props.width }}>
        {/* <AiOutlineMenu className="i-bar__icon top" style={{ width: "30px", height: "30px", color: "white" }}/> */}
        <FaPaintBrush className="i-bar__icon" />
        <MdOutlineHelp className="i-bar__icon" onClick={handleStyleClick} />
      </div>
    </>
  );
};

export default InterfaceBar;
