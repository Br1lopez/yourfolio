import React from "react";
import { Dropdown, Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Nav } from "react-bootstrap";
import "../navBar.scss";

interface TabProps {
  name: string;
}

const Tab = (props: TabProps) => {
  return (
    <Whisper
      trigger="contextMenu"
      speaker={
        <Popover title="Geeks Menu">
          <div className="red">hola</div>
        </Popover>
      }
    >
      <Nav.Link className="navbar__tabLink" href="#">
        {props.name}
      </Nav.Link>
    </Whisper>
  );
};

export default Tab;
