import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "./navBar.scss";
import NewTabModal from "./NewTabModal";
import { useState } from "react";



interface NavBarProps {
  title: string;
}

export const NavBar = (props: NavBarProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <>
      <Navbar bg="light" expand="sm" id="navbar">
        <Navbar.Brand
          href="index.html"
          data-toggle="popover"
          data-trigger="focus"
          data-placement="bottom"
        >
          {props.title}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarNavDropdown"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="ml-auto tabList" id="nav-element-list">
            <Nav.Item
              className="nav-item active newTabButton"
              id="newTabParent"
            >
              <Nav.Link href="#">
                <Button
                  variant="link"
                  data-toggle="modal"
                  data-target="#newTab"
                  onClick={() => {setModalShow(true)}}
                >
                  <i
                    className="fas fa-plus-circle"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <NewTabModal show={modalShow} setShow={setModalShow}></NewTabModal>
    </>
  );
};
