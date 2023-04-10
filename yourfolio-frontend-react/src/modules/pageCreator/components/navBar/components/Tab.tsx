import React from "react";
import { Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Nav } from "react-bootstrap";
import "./tab.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { API_PORT } from "../../../../../globals";

export interface TabProps {
  name: string;
  open: boolean;
  index: any;
  tabId: number;
}

const Tab = (props: TabProps) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:${API_PORT}/tabs/${props.tabId}`)
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
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
              <FaTrashAlt onClick={handleDelete} />
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
