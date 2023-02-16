import { Nav} from '../elements/nav.js'
import { Gallery} from '../elements/gallery.js'
import { getPageData} from '../getdata.js'
import { Style } from '../elements/style.js';


let data = getPageData();
new Style(data);
new Nav(data);
new Gallery(data);

