import "./navBar.scss";

export interface NavBarProps {
  title: string;
}

export const NavBar = (props: NavBarProps) => {
  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light"
        id="navbar"
      >
        <a
          id="navbar-brand"
          className="navbar-brand"
          href="index.html"
          role="button"
          data-toggle="popover"
          data-trigger="focus"
          data-placement="bottom"
        >
          {props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".navbarbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto tabList" id="nav-element-list">
            <li className="nav-item active newTabButton" id="newTabParent">
              <a className="nav-link" href="#">
                <button type="button" data-toggle="modal" data-target="#newTab">
                  <i
                    className="fas fa-plus-circle"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>

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
