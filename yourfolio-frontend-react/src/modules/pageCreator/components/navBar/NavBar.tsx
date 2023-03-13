import "./navBar.scss";

export interface NavBarProps{
  title: string
}

export const NavBar = (props: NavBarProps) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light" id="navbar">
      <a
        id="navbar-brand"
        className="navbar-brand"
        href="index.html"
        role="button"
        data-toggle="popover"
        data-trigger="focus"
        data-placement="bottom"
      >{props.title}</a>
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
  );
};
