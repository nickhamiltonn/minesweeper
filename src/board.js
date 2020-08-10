export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get numberOfBombs() {
    return this._numberOfBombs;
  }

  get numberOfTiles() {
    return this._numberOfTiles;
  }

  //function to flip a tile
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }

    this._numberOfTiles--;
  }


  //function to get the number of neighboring bombs
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      let neighborRowIndex = rowIndex + offset[0];
      let neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 &&
          neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 &&
          neighborColumnIndex < numberOfColumns) {
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
      }
    });
    return numberOfBombs;
  }


  hasSafeTiles() {
    return (this._numberOfTiles !== this._numberOfBombs);
  }


  // function to print board
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }


  //dynamically creating player board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }

    return board;
  };


  //dynamically creating bomb board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      // note this version may place more than one bomb in the same spot
      // to be fixed with control flow
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColIndex] !== 'B') {
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  };


};
