import { Nav} from '../elements/nav.js'
import { Gallery} from '../elements/gallery.js'
import { getPageData} from '../getdata.js'


let data = getPageData();
new Nav(data);
new Gallery(data);

