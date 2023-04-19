import React from "react";
import "./interfaceBar.scss";
import { IoSettingsSharp, IoColorPaletteSharp } from "react-icons/io5";
import {FaPaintBrush} from 'react-icons/fa';
import {MdOutlineHelp} from 'react-icons/md';
import {AiOutlineMenu} from 'react-icons/ai';

interface InterfaceBarProps {
  width?: string;
}

const InterfaceBar = (props: InterfaceBarProps) => {
  return (
    <div className="i-bar" style={{ width: props.width }}>
        {/* <AiOutlineMenu className="i-bar__icon top" style={{ width: "30px", height: "30px", color: "white" }}/> */}
      <FaPaintBrush className="i-bar__icon" />
      <MdOutlineHelp className="i-bar__icon" />
    </div>
  );
};

export default InterfaceBar;
