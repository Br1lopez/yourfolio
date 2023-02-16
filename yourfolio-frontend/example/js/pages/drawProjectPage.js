import { Nav} from '../elements/nav.js'
import { Project} from '../elements/project.js'
import { getPageData} from '../getdata.js'


let data = getPageData();
new Nav(data);
new Project(data);

