# DOMnoy
DOMnoy is a JavaScript DOM manipulation library. You can check out the repo [here](https://github.com/tonmoyl/domnoy_tic_tac_toe)

This library uses Vanilla Javascript for useful methods and functionality. To show that the library is effectively working, view this demo [here](http://lifazul.com/DOMnoy_tictactoe/)

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
3. object: $l checks to see if the object is an instance of HTML so that it can be converted to a DOMNodeCollection for further manipulation

### DOM manipulation

#### html

Takes in an optional argument of a string. The optional argument will replace the inner HTML of the string. If no argument is given, then the function will return the innerHTML of that element.

#### empty

Sets the inner HTML of the selected element to be empty.


#### append

Takes in an argument and set the inner HTML of that element.

#### attr

Takes in one argument and an additional optional argument (attrName, value). If there is no setter present, then the function returns the value of the given attribute. If there is the second optional argument, then it sets the attribute with the value.

#### addClass & removeClass

Takes in an argument and adds/deletes the classes that matches the argument.

#### children

Returns all the children of the HTML element as a DOMNodeCollection for that element

#### parent

Returns the parent of the current element

#### remove

Sets the outerHTML of that element as an empty string
