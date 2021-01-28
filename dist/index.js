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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rcHJvamVjdC8uL3NjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHdDQUF3QyxVQUFVLElBQUksVUFBVTtBQUNoRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByaW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW50Jyk7XHJcbmNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wdGlvbi0xJyk7XHJcblxyXG5jYXJkcy5mb3JFYWNoKGZvb2JhciA9PiBmb29iYXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcnVuRXZlbnQpKTtcclxuXHJcbmZ1bmN0aW9uIHJ1bkV2ZW50KGUpIHtcclxuXHJcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2IoJHtlLm9mZnNldFh9LCAke2Uub2Zmc2V0WX0sIDQwKWA7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==