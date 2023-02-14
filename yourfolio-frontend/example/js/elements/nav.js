import {
  WebElement
} from './webElement.js'


export class Nav extends WebElement {

  draw() {
    this.defineNav();
    this.definePopUp();
  }

  defineNav() {
    this.element = document.createElement("nav");
    this.element.classList.add("navbar", "navbar-expand-sm", "navbar-light", "bg-light");
    this.element.id = "navbar";
    this.element.innerHTML = `<a id="navbar-brand" class="navbar-brand" href="index.html" role="button" data-toggle="popover" data-trigger="focus" data-placement="bottom"">${this.data["title"]}</a>
    <button class="navbar-toggler" type="button" this.data-toggle="collapse" this.data-target=".navbarbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ml-auto tabList" id="nav-element-list">
        <li class="nav-item active newTabButton" id="newTabParent">
          <a class="nav-link" href="#">
          <i class="fas fa-plus-circle" style="font-size:1.5em;" type="button" data-toggle="modal" data-target="#newTab"></i>
        </a>
        </li>
      </ul>
    </div>`;
    (document.body).append(this.element);


    $(document).on("contextmenu", `#navbar-brand`, function (e) {
      $(`#navbar-brand`).popover({
        html: true,
        content: `<span class="action-button"><i id=\"reset-page\" class=\"fas fa-redo-alt\"></i></span>`
      });
      //BOOTSTRAP fuerza a usar JQuery
      $(`#navbar-brand`).popover('toggle');

      e.preventDefault();
    });

    $(document).on("click", `#reset-page`, function (e) {
      fetch("./data.json")
      .then(response => response.json())
      .then(data => {
          localStorage.setItem("pageData", JSON.stringify(data));
      });

      location.reload();
    });

    this.data["tabs"].forEach(tabData => {
      this.drawTab(tabData.name, document.getElementById("nav-element-list"));
    });

    $('head').append(`
    <style>
      .navbar{
        background-color: ${this.data["style"]["bg-color"]} !important;
      }

      .navbar a{
        color: ${this.data["style"]["font-color"]} !important;
      }

      .navbar-toggler{
        color: ${this.data["style"]["font-color"]} !important;
        font-size: 1.8em;
      }

      .navbar .active a{
        font-weight: bold !important;
      }
    </style>
    `);
  }

  definePopUp() {
    this.element.innerHTML +=
      `<div class="modal fade" id="newTab" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Crear pestaña</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form id="register-form">
                <div class="form-outline mb-4">
                  <label class="form-label" for="newTabTitle" >Nombre:</label>
                  <input type="text" id="newTabTitle" class="form-control form-control-lg" required />
                </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" id="newTabButton">Crear pestaña</button>
        </div>
      </div>
    </div>
</div>`;

    // El método de JQuery "on()" es equivalente al addEventListener de JS, pero espera por defecto a que se carguen los elementos de DOM.
    $(document).on("click", "#newTabButton", () => {
      let newTabTitle = $("#newTabTitle").val();
      this.saveTab(newTabTitle);
      $('#newTab').modal('hide');
      this.drawTab(newTabTitle);
    });
  }

  saveTab(tabTitle){
    this.data.tabs.push({
      "name": tabTitle,
      "sections": {}
    });
    localStorage.setItem("pageData", JSON.stringify(this.data));
  }

  drawTab(tabTitle) {
    var data = this.data;
    let tabId = tabTitle.replace(" ", "-");

    let newTab = document.createElement("li");
    newTab.classList.add("nav-item");
    if (new URLSearchParams(window.location.search).get("tab") == tabId) {
      newTab.classList.add("active");
    }
    newTab.innerHTML = `<a id="${tabId}" tabindex="0" class="nav-link" href="index.html?tab=${tabId}" role="button" data-toggle="popover" data-trigger="focus" data-placement="bottom">${tabId}<span class="sr-only">(current)</span></a>`;
    
    $(document).on("contextmenu", `#${tabId}`, function (e) {
      $(`#${tabId}`).popover({
        html: true,
        content: `<span class="action-button"><i id=\"${tabId}-delete\" class=\"fas fa-trash-alt\"></i></span>`
      });
      //BOOTSTRAP fuerza a usar JQuery
      $(`#${tabId}`).popover('toggle');

      e.preventDefault();
    });

    
    $(document).on("click", `#${tabId}-delete`, function (e) {
      let index = data.tabs.findIndex((tab) => tab.name == tabId);
      data.tabs.splice(index, 1);
      localStorage.setItem("pageData", JSON.stringify(data));
  
      let tab = document.getElementById(tabId);
      tab.parentNode.removeChild(tab);
    });

    ($("#newTabParent")).before(newTab);
  }
}