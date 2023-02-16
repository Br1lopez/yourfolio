import {
  WebElement
} from './webElement.js'


function findProject(data, tabId, projectId) {
  // Find the tab with the given ID
  const tab = data["tabs"].find(tab => tab.id === tabId);

  if (tab) {
    // Find the project with the given ID in the tab's sections
    for (const section of tab.sections) {
      const project = section.projects.find(project => project.id === projectId);
      if (project) {
        return project;
      }
    }
  }

  // Return null if no project was found
  return null;
}

export class Project extends WebElement {

  draw() {
    let tab = new URLSearchParams(window.location.search).get("tab");
    let project = findProject(this.data, tab, new URLSearchParams(window.location.search).get("project"));
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
          <a class="back" href="index.html?tab=${tab}"><i class="fas fa-chevron-circle-left"></i></a>
          </div>
            </div>
    </div>
  `;
  }

}