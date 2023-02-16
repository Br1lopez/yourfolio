import {
  WebElement
} from './webElement.js'

export class Project extends WebElement {

  draw() {

    let project = this.data
    document.body.innerHTML +=
      `
      <div class="gal_fondo">
      <img src="img/wp4.jpg"]}"></img>
    </div>
    
    <div class="pre_gal"> </div>
    
    <div class="ficha corto">
      <div class="info">
          <div class="lowpart">
        <div class="thumb fadeshow" id="video">
    
    <div style='padding:56.25% 0 0 0;position:relative;'><iframe src='${project["video_url"]}' style='position:absolute;top:0;left:0;width:100%;height:100%;' frameborder='0' allow='autoplay; fullscreen' allowfullscreen></iframe></div><script src='https://player.vimeo.com/api/player.js'></script>
    
        </div>
          <div class= "description">
            <p class="title_desc">${project["name"]}</p>
                    <p class="sep_desc">.</p>
    
            <p class = "sinopsis">
              ${project["description"]}
          </p>
          <a class="back" href="example/index.html"><i class="fas fa-chevron-circle-left"></i> ${back_button_visual}</a>
          </div>
            </div>
    </div>
  `;
  }

}