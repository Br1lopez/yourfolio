import { Nav} from './elements/nav.js'
import { Gallery} from './elements/gallery.js'

// Si no existen datos en el sessionStorage (se acaba de abrir la web o de hacer un cambio)... 
// ... los datos se cargan de la API y se guardan en el sessionStorage.
if(sessionStorage.getItem("data") == null){
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem("data", JSON.stringify(data));
        drawPage(data);
    });
// Si existen datos en el sessionStorage, se cargan directamente de ahí.
}else{
    drawPage(JSON.parse(sessionStorage.getItem("data")));
}


function drawPage(data) {
    new Nav(data);
    new Gallery(data);
}

