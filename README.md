# DOMnoy
DOMnoy is a JavaScript DOM manipulation library. You can check out the repo [here](https://github.com/tonmoyl/domnoy_tic_tac_toe)

This library uses Vanilla JavaScript for useful methods and functionality. To see tic tac toe being built with this library, see the demo [here](http://lifazul.com/DOMnoy_tictactoe/)

## Usage
To use this JavaScript library, you need to do the following procedure:

1. Download the repo into your file directory
2. Include the source in the script tag at the head of the HTML file.


## API

### Core Function

#### $l

$l represents the major function for DOMnoy. The function takes in three types of arguments:
1. function: $l waits until the document is fully loaded for a document ready callback
2. string: $l searches through the HTML page to find the elements that matches the string argument. The string uses the same search case as CSS selectors
3. object: $l takes in an argument of an HTML element. It is then converted to a DOMNodeCollection for further manipulation

### DOMnoy functions

#### append

Sets the inner HTML of that element

Here is an example of using the append function for tic tac toe:
```JavaScript
if (this.game.board.isOver()) {
  if(!this.game.winner()) {
    $l('.congrats').append(`no one has won`);
  }
  else {
    $l('.congrats').append(`${this.game.currentPlayer} has won!`);
  }
}
```

#### setAttribute

Takes in two arguments:
(1) First argument: the property of the HTML element
(2) Second argument: the value for the respective property

Here is a code snippet to see it actually work for Tic Tac Toe:
```JavaScript
$square.setAttribute("background", "#0F0F0F");
$square.setAttribute("box-shadow", "inset 0px 0px 10px black");
```
