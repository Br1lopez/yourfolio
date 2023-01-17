import { Nav} from './elements/nav.js'
import { Gallery} from './elements/gallery.js'

fetch("./data.json")
.then(response => response.json())
.then(data => {
    alert("heyy")
    new Nav(data);
    new Gallery(data);
});