class View {
  constructor(game, $el) {
    this.$el = $el;
    this.setupBoard($el);
    this.game = game;
  }

  bindEvents() {
    this.$el.on('click', (e) => {

      let $square = $l(e.target);
      if(!this.game.board.isOver()) {
        this.makeMove($square);
      }
    } );
  }

  makeMove($square) {
    // this.game.playMove($square.data('pos'));
    let pos = $square.htmlElements[0].id.split(",")
    this.game.playMove(pos);
    if (pos) {
      let colors = ['#de5127', '#a7c91c', '#fd5153', '#751f51', '#f7e275', '#0f486a'];
      let random_color = colors[Math.floor(Math.random() * colors.length)];

      $square.append(this.game.currentPlayer);
      // $square.css("background", random_color);
      // $square.css("box-shadow", "inset 0px 0px 10px black");
      $square.setAttribute("background", random_color);
      $square.setAttribute("box-shadow", "inset 0px 0px 10px black");
    }

    if (this.game.board.isOver()) {
      if(!this.game.winner()) {
        $l('congrats').append(`no one has won`);
      }
      else {
        $l('congrats').append(`${this.game.currentPlayer} has won!`);
      }
    }
  }

  setupBoard($el) {
    $el.append("<div class=grid>")
    const $grid = $l(".grid");
    $l('.grid').append('<ul class=gridlist>');

    for (let i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        $l('ul').append(`<li id=${[i,j]}>`);
      }
    }

    // const $grid = $l(".grid");
    // el.append($grid);
    // for (var i = 0; i < 3; i++) {
    //   for (var j = 0; j < 3; j++) {
    //
    //     // const $li = $l('li');
    //     // console.log(el);
    //     // debugger
    //     // $li.attr('pos', [i,j]);
    //     // $grid.append($li);
    //   }
    // }



    // let total = 0;
    //
    // for (let i = 0; i < 6; i++) {
    //   for (let j = 0; j < 7; j++) {
    //     $l(Object.values($l("li"))[0][total]).attr('pos', [i, j]);
    //     total += 1;
    //   }
    // }

  }
}

module.exports = View;
