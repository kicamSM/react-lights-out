import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());
  // ! this is how we have aacecss to the arrayBoard in the flip cells around 

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    console.log("createBoard is running")
    let initialBoard = [];
    for(let y = 0; y < nrows; y++) {
      let row = []
      for(let x = 0; x < ncols; x++) {
        row.push(Math.random() > chanceLightStartsOn ? false : true);
        // this is pushing the content of the board of each cell which is currently set to null. 
      }
      initialBoard.push(row)
    }
    console.log("initialBoard:", initialBoard)
    return initialBoard;
  }

  
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => cell === false));
    // * in the board in every row in the row in every cell if the cell is false then return true --> note that this is the value of the "cell" in the array of arrays but is not the cell element. 
    
  }

  function flipCellsAround(coord) {
    console.log('coord:', coord)

    // Here the board is in state. We are setting the board with a copy of the old board. 
    console.log("board:", board)
    // ! how do we know what the old board is here? It is the Board Array. 
    setBoard(arrayBoard => { console.log("arrayBoard:", arrayBoard)
      const [y, x] = coord.split("-").map(Number);
      // setting the coordinates of the board and getting the coordinates as numbers 
      // !note this line is the line that connects the arrayBoard and the displayed board. The displayed board has coord which we to setBoard. We taken those coor and we can use them in the arrayBoard to flip those cells. 



      const flipCell = (y, x, boardCopy) => { 
        // if this coord is actually on board, flip it
        console.log("boardCopy[0][1]:", boardCopy[0][1])

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        // * if x is greater than or equal to 0 & is less than number of columns & y is greater than or equal to 0 and less than nrows then the value of the cell with the cordinates x, y (boardCopy[x][y] is set to the opposite values )
      };

     // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = arrayBoard.map(row => [...row]);
      // !Here we are defining boardCopy but we are using boardCopy above

       // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy); 
      // *flipping the cell you click on 
      flipCell(y, x - 1, boardCopy);
      // *flipping the cell to the left of the cell clicked on
      flipCell(y, x + 1, boardCopy);
      // *flipping the cell to the right of the cell clicked on
      flipCell(y - 1, x, boardCopy);
      // *flipping the cell above the cell clicked on
      flipCell(y + 1, x, boardCopy);
      // *flipping the cell below the cell clicked on

      return boardCopy;

      // TODO: return the copy
    });
  }
  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div>You Won</div>;
    // *if hasWon is true return a single div with "You Won"
  }

  // TODO

  // ! make table board - this is actual displaying the baord as table this is why you were confused. Because make table board you did already.... annoying.

  let tblBoard = [];
  // * creating empty array 

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
      // *Here we are pushing each cell element into the row which makes sense. 
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
    // *Here the row element with a key of y is being pushed into the tblBoard
  }
  console.log("tblBoard2:", tblBoard)

  return (
    <>
    <h1>Lights Out 💡</h1>
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
    </>
  );
// *Here we are returning the table board 

}

export default Board;

