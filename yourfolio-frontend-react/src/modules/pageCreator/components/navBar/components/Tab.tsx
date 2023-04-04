import React from "react";
import { Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Nav } from "react-bootstrap";
import "./tab.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export interface TabProps {
  name: string;
  open: boolean;
  index: any;
  tabId: number;
}

const Tab = (props: TabProps) => {
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
      >
        {props.name}
      </Nav.Link>
    </Whisper>
  );
};

export default Tab;
