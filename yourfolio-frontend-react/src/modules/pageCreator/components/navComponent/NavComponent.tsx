//@ts-nocheck
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavComponent extends React.Component {

  render() {
    const { title, tabs } = this.props.data;

    return (
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#home">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link href="#" data-toggle="modal" data-target="#newTab">
                <i className="fas fa-plus-circle" style={{ fontSize: '1.5em' }}></i>
              </Nav.Link>
            </Nav.Item>
            {tabs.map(tabData => (
              <Nav.Item key={tabData.name} className={new URLSearchParams(window.location.search).get("tab") === tabData.name.replace(' ', '-') ? 'active' : ''}>
                <Nav.Link href={`index.html?tab=${tabData.name.replace(' ', '-')}`} data-toggle="popover" data-trigger="focus" data-placement="bottom">{tabData.name}<span className="sr-only">(current)</span></Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
        <NewTabModal />
      </Navbar>
    );
  }
}

class NewTabModal extends React.Component {

  handleNewTabSubmit = (event) => {
    event.preventDefault();
    const newTabTitle = document.querySelector('#newTabTitle').value;
    this.props.onNewTabSubmit(newTabTitle);
  }

  render() {
    return (
      <div className="modal fade" id="newTab" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Crear pestaña</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleNewTabSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="newTabTitle">Nombre:</label>
                  <input type="text" id="newTabTitle" className="form-control form-control-lg" required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleNewTabSubmit}>Crear pestaña</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavComponent;
