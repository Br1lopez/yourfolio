import { WebElement } from './webElement.js'

export class Gallery extends WebElement {
  draw(){
    document.body.innerHTML +=
    `
    <div class="gal_fondo">
    <img class="cincuenta" src="img/wp4.jpg">
  </div>
  
  <div class="galeria" id="gal2"> 
  </div>`;

  let galeria = document.getElementById("gal2");
  let page = new URLSearchParams(window.location.search).get("tab");
  this.data["tabs"].find(tab => tab["name"] == page)["sections"][0]["projects"].forEach(project => {
    galeria.innerHTML += 
    `<a class='visual gal_elem [type value] [class value]' href='[link value]'>
    <div onmouseover='ImgHoverVisual(this)' onmouseout='ImgUnhoverVisual(this)' class='blurred'>
      <img class='thumb_img' src='img/${project["image"]}'>
      <!-- <div class='icon_container'>
              <img class='icon' src='/images/thumbs/[type value]_thumb.png'>
              </div> -->
  
      <div class='thumb_ficha'>
        <p class='thumb_title'>${project["name"]}</p>
        <p class='thumb_paragraph'>${project["description"]}</p>
      </div>  
    </div>            
  </a>  `;
  });

  document.body.innerHTML +=
  `<div class="modal fade" id="newProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear proyecto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <form id="register-form">
              <div class="form-outline mb-4">
                <label class="form-label" for="titulo" >Título:</label>
                <input type="text" id="titulo" class="form-control form-control-lg" required />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="descripcion">Descripción breve:</label>
                <input type="text" id="descripcion" class="form-control form-control-lg"/>
              </div>

              <div class="form-outline mb-4">
                  <label class="form-label" for="imagen">Imagen:</label>
                  <input type="file" id="imagen" class="form-control form-control-lg"/>
              </div>
          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Crear proyecto</button>
      </div>
    </div>
  </div>
</div>`;
}
}