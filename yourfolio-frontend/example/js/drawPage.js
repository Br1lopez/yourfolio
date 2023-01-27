import { Nav} from './elements/nav.js'
import { Gallery} from './elements/gallery.js'

// ___________TEMPORAL______________

// Se pasa de JSON a localStorage (se hace solo UNA vez)
if(localStorage.getItem("pageData") == null){
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("pageData", JSON.stringify(data));
    });
}

//______________________



var localPageData = JSON.parse(localStorage.getItem("pageData"));
drawPage (localPageData);


function drawPage(data) {
    new Nav(data);
    new Gallery(data);
}

