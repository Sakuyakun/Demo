import component from './component';
import style1 from './common.css';
import style2 from './common2.css';
import sassstyle from './global.scss';

document.getElementById('app').appendChild(component('123456',style1.class1,style2.class1,sassstyle.main));
