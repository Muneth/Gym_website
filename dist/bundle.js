/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./scripts/app.js ***!
  \************************/
const print = document.querySelector('#print');
const cards = document.querySelectorAll('.option-1');

cards.forEach(foobar => foobar.addEventListener('mousemove', runEvent));

function runEvent(e) {

    this.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rcHJvamVjdC8uL3NjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHdDQUF3QyxVQUFVLElBQUksVUFBVTtBQUNoRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcmludCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmludCcpO1xyXG5jb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHRpb24tMScpO1xyXG5cclxuY2FyZHMuZm9yRWFjaChmb29iYXIgPT4gZm9vYmFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHJ1bkV2ZW50KSk7XHJcblxyXG5mdW5jdGlvbiBydW5FdmVudChlKSB7XHJcblxyXG4gICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiKCR7ZS5vZmZzZXRYfSwgJHtlLm9mZnNldFl9LCA0MClgO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=