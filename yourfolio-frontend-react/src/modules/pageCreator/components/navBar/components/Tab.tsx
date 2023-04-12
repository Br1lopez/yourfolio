import React, { useContext } from "react";
import { Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Nav } from "react-bootstrap";
import "./tab.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { PortfolioContext } from "src/modules/pageCreator/PageCreator";
import {  useQueryClient } from "@tanstack/react-query";


export interface TabProps {
  name: string;
  open: boolean;
  index: any;
  tabId: number;
}

const Tab = (props: TabProps) => {
  const queryClient = useQueryClient();

  const { setActiveElementId} = useContext(PortfolioContext);

  const handleClick = (event: any) => {
    event.preventDefault();
    setActiveElementId(props.tabId);
  };

  return (
    <Whisper
      trigger="contextMenu"
      placement="bottom"
      open={props.open}
      speaker={
        <Popover>
          <div className="action-buttons-container">
            <span className="action-button">
              <FaEdit />
            </span>
            <span className="action-button">
              <FaTrashAlt />
            </span>
          </div>
        </Popover>
      }
    >
      <Nav.Link
        className="navbar__tabLink"
        href="#"
        id={`navbar__tabLink_${props.index}`}
        onClick={handleClick}
      >
        {props.name}
      </Nav.Link>
    </Whisper>
  );
};

export default Tab;
