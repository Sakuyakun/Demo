import cateye from './assets/cateye.png';
import moment from 'moment';

export default function (text,class1,class2,class3) {
  const element = document.createElement('div');
  element.innerHTML = text;
  element.className = class1;

  const p = document.createElement('p');
  p.innerText = 'p line';
  p.className = class2;
  element.appendChild(p);

  const p2 = document.createElement('p');
  p2.innerText = 'today ' + moment().format('dddd');
  p2.className = class3;
  element.appendChild(p2);

  const p3 = document.createElement('img');
  p3.src = cateye;
  element.appendChild(p3);

  return element;
}
