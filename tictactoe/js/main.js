const View = require('./ttt-view');
const Game = require('./game');
const Board = require('./board')

document.addEventListener('DOMContentLoaded', ()=>{
  var newGame = new Game();
  $view = $l('.ttt');
  var view = new View(newGame, $l('.ttt'));
  $button = $l('.new-game')

  $button.on('click', () => {
    $view.empty();
    $l('.congrats').empty();
    newGame.board = new Board();
    newGame.currentPlayer = Board.marks[0];

    var view = new View(newGame, $l('.ttt'));

  })

  view.bindEvents();
});
