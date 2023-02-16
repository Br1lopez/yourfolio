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
  let currentTab = new URLSearchParams(window.location.search).get("tab");


  let galleryElements = "";
  this.data["tabs"].find(tabData => tabData["name"] == currentTab)["sections"].find(section=> section.name == "global")["projects"].forEach(project => {
    galleryElements += 
    `<a class='visual gal_elem [type value] [class value]' href='project.html?tab=${currentTab}&project=${project["id"]}'>
    <div onmouseover='ImgHoverVisual(this)' onmouseout='ImgUnhoverVisual(this)' class='blurred'>
      <img class='thumb_img' src='${project["image"]}'>
      <div class='thumb_ficha'>
        <p class='thumb_title'>${project["name"]}</p>
        <p class='thumb_paragraph'>${project["description"]}</p>
      </div>  
    </div>            
  </a>  `;
  });

  galeria.innerHTML += galleryElements;

  galeria.innerHTML += 
  `<a class='visual gal_elem addProject'>
  <div>
  <i class="fas fa-plus" type="button" data-toggle="modal" data-target="#newProject"></i>
    </div>  
  </div>            
</a>  `;



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
                <label class="form-label" for="newProjectTitle" >Título:</label>
                <input type="text" id="newProjectTitle" class="form-control form-control-lg" required />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="newProjectDescription">Descripción breve:</label>
                <input type="text" id="newProjectDescription" class="form-control form-control-lg"/>
              </div>

              <div class="form-outline mb-4">
                  <label class="form-label" for="newProjectImage">Imagen:</label>
                  <input type="text" id="newProjectVideo" class="form-control form-control-lg"/>
              </div>
          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button id="addProject" type="button" class="btn btn-primary">Crear proyecto</button>
      </div>
    </div>
  </div>
</div>`;

function youtube_parser(url){
  
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

// El método de JQuery "on()" es equivalente al addEventListener de JS, pero espera por defecto a que se carguen los elementos de DOM.
$(document).on("click", "#addProject", () => {
  let data = this.data;
  let youtubeId = youtube_parser($("#newProjectVideo").val());

  console.log(data.tabs.find(tabData => tabData.name == currentTab).sections.find(section => section.name == "global"));
  data.tabs.find(tabData => tabData.name == currentTab).sections.find(section => section.name == "global").projects.push({
    "name": $("#newProjectTitle").val(),
    "description": $("#newProjectDescription").val(),
    "image": `https://img.youtube.com/vi/${youtubeId}/0.jpg`,
    "video_url": `https://www.youtube.com/embed/${youtubeId}`
  });
  
  sessionStorage.setItem("pageData", JSON.stringify(data));
  $('#newProject').modal('hide');
  location.reload();
});

}

}