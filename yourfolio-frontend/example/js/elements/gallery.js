import { WebElement } from './webElement.js'

export class Gallery extends WebElement {
  draw(){
    document.body.innerHTML +=
    `
    <div class="gal_fondo">
    <img class="cincuenta" src="img/macaco.webp">
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
  })
}
}