import { Button, Nav, Navbar } from "react-bootstrap";
import "./navBar.scss";

export interface NavBarProps {
  title: string;
}

export const NavBar = (props: NavBarProps) => {
  $(document).on("click", "#newTabButton", () => {
    let newTabTitle = $("#newTabTitle").val();
    this.saveTab(newTabTitle);
    $('#newTab').modal('hide');
    this.drawTab(newTabTitle);
  });

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

      <div
        className="modal fade"
        id="newTab"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Crear pestaña
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="register-form">
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="newTabTitle">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="newTabTitle"
                    className="form-control form-control-lg"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" id="newTabButton">
                Crear pestaña
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
