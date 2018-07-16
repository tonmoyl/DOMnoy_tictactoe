const View = require('./ttt-view');
const Game = require('./game');

document.addEventListener('DOMContentLoaded', ()=>{
  const newGame = new Game();
  $view = $l('.ttt');
  const view = new View(newGame, $l('.ttt'));
  view.bindEvents();
});
