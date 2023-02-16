import { Nav} from '../elements/nav.js'
import { Project} from '../elements/project.js'
import { getPageData} from '../getdata.js'
import { Style } from '../elements/style.js';

let data = getPageData();
new Style(data);
new Nav(data);
new Project(data);

