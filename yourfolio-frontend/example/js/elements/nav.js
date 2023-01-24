import { WebElement } from './webElement.js'

export class Nav extends WebElement {
  draw(){
      this.drawNav();
      this.drawPopUp();
  }


drawNav(){
  document.body.innerHTML +=
  `
  <nav class="navbar navbar-expand-sm navbar-light bg-light" id="nav">
  <a class="navbar-brand" href="index.html">
  ${this.data["title"]}  
  </a>
  <button class="navbar-toggler" type="button" this.data-toggle="collapse" this.data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
  <i class="fas fa-bars"></i>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto">
    </ul>
  </div>
  </nav>
  `;

  var navElementList = document.getElementById("navbarNavDropdown").children[0];

  this.data["tabs"].forEach(tab => {
    let page = new URLSearchParams(window.location.search).get("tab");
    navElementList.innerHTML += `<li class="nav-item ${page==tab.name? "active": ""}">
      <a class="nav-link" href="index.html?tab=${tab.name}">${tab.name}<span class="sr-only">(current)</span></a>
      </li>`})
      
    navElementList.innerHTML +=  `<li class="nav-item active">
    <a class="nav-link" href="#">
    <i class="fas fa-plus-circle" style="font-size:1.5em;" type="button" data-toggle="modal" data-target="#newTab"></i>
    </a>
    </li>`;

    $('head').append(`
    <style>
      #nav{
        background-color: ${this.data["style"]["bg-color"]} !important;
      }

      #nav a{
        color: ${this.data["style"]["font-color"]} !important;
      }

      .navbar-toggler{
        color: ${this.data["style"]["font-color"]} !important;
        font-size: 1.8em;
      }

      #nav .active a{
        font-weight: bold !important;
      }
    </style>
    `);
}

drawPopUp(){
    document.body.innerHTML +=
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
  let data = JSON.parse(sessionStorage.getItem("data"));

  data.tabs.push({"name": $("#newTabTitle").val()});
  
  sessionStorage.setItem("data", JSON.stringify(data));
  $('#newTab').modal('hide');
  location.reload();
});
  }

}







