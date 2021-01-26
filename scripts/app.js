const print = document.querySelector('#print');
const cards = document.querySelectorAll('.option-1');

cards.forEach(foobar => foobar.addEventListener('mousemove', runEvent));

function runEvent(e) {

    this.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
}
