import React, { useContext } from "react";
import "./interfaceBar.scss";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";
import { PortfolioContext } from "../../../../hooks/PortfolioContext";
import { ModalType } from "../../../../types/portfolioContextTypes";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

//TODO: descartar width
interface InterfaceBarProps {
  portfolioId: number;
}

export const InterfaceBar = (props: InterfaceBarProps) => {
  const { modalWindowData } = useContext(PortfolioContext);
  const navigate = useNavigate();


  return (
    <div className="i-bar">
      <AiFillHome
        className="i-bar__icon top"
        // style={{ width: "30px", height: "30px", color: "white" }}
        onClick={() => navigate("/home")}
      />
      <FaPaintBrush className="i-bar__icon" onClick={() => {
        modalWindowData.set({
          ...modalWindowData.value,
          elementId: props.portfolioId,
          modalType: ModalType.SetSyle,
        });
      }} />
      <MdOutlineHelp className="i-bar__icon"
        onClick={() => {
          modalWindowData.set({
            ...modalWindowData.value,
            modalType: ModalType.Intro,
          });
        }}
      />
    </div>
  );
};
