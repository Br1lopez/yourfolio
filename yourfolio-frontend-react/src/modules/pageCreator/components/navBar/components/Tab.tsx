import React from "react";
import { Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Nav } from "react-bootstrap";
import "../navBar.scss";

interface TabProps {
  name: string;
  open: boolean;
  index: any;
}

const Tab = (props: TabProps) => {
  return (
    <Whisper
      trigger="contextMenu"
      // placement="bottom"
      open={props.open}
      speaker={
        <Popover>
          <div className="red">hola</div>
        </Popover>
      }
    >
      <Nav.Link className="navbar__tabLink" href="#" id={`navbar__tabLink_${props.index}`}>
        {props.name}
      </Nav.Link>
    </Whisper>
  );
};

export default Tab;
