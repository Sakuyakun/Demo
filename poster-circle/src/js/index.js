const POSTERS_PER_ROW = 12;

function setup_posters (row, radius) {
  var posterAngle = 360 / POSTERS_PER_ROW;
  for (let i = 0; i < POSTERS_PER_ROW; i++) {
    var poster = document.createElement('div');
    poster.className = 'poster';

    var transform = 'rotateY(' + (posterAngle * i) + 'deg) translateZ(' + radius + 'px)';
    poster.style.webkitTransform = transform

    poster.appendChild(document.createElement('p')).textContent = i
    row.appendChild(poster)
  }
}

function init() {
  setup_posters(document.getElementById('ring-1'), 240)
  setup_posters(document.getElementById('ring-2'), 200)
  setup_posters(document.getElementById('ring-3'), 180)
}

window.addEventListener('load', init(), false);