/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    let temp = new Array(WIDTH).fill(null)
    board.push(temp)
  }

  return board
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board')
  //Create new tr element, add an id and a click event to it
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  top.addEventListener("click", handleClick);
  //Creating the Top Row by looping throught he WIDTH which decides the size of each row
  for (var x = 0; x < WIDTH; x++) {
    //creates td and appends it to the tr
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //appends tr to the board
  htmlBoard.append(top);

  //Loops through the HEIGHT to decide how many rows we will have
  for (var y = 0; y < HEIGHT; y++) {
    //create a new tr for each row
    const row = document.createElement("tr");
    //Loops through the width to decide how many columns in each row
    for (var x = 0; x < WIDTH; x++) {
      //create a new td and append it to the row
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);

      row.append(cell);
    }
    //append each row to the table
    htmlBoard.append(row);
    

  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let temp = 0
    for(let i = board.length - 1; i >=0; i--){
    if(board[i][x] == null){
      temp =  i
      break;
    }
  }
  return temp;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  if(board[0][x] == null){
    let newDiv = document.createElement('div')
    newDiv.classList.add('piece')
    //check current player and add the proper class for the div
    if(currPlayer == 1){
      newDiv.classList.add('p1')
    }else{
      newDiv.classList.add('p2')
    }
    let nextPos = `${y}-${x}`
    let spot = document.getElementById(nextPos)
    spot.append(newDiv)
  }


}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  //console.log(x)
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer
 

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let checkTie = board.every(function(word){
    return word.every(function(w){
      return w != null
    })
  })
  if(checkTie){
    return endGame("Tie!")
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  (currPlayer == 1 ? currPlayer = 2:currPlayer = 1)


}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // for each position on the board create arrays in every direction possible with 4 cells
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //starting from a position on the board create an horizontal,vertical and diagonal
      //array of 4 cells
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //if the player number is the same for 4 cells in successsion in any direction
      //returns that there is a winner
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
