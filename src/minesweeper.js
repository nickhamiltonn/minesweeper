//dynamically creating player board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];

  for (let i = 0; i < numberOfRows; i++) {
    row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }

  return board;
};


//dynamically creating bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];

  for (let i = 0; i < numberOfRows; i++) {
    row = [];
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


//function to get the number of neighboring bombs
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    neighborRowIndex = rowIndex + offset[0];
    neighborColumnIndex = columnIndex + offset[1];

    if (neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns) {
        if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
    }
  });
  return numberOfBombs;
}


//function to flip a tile
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}


// function to print board
const printBoard = board => {
  console.log(board.map(row =>
    row.join(' | ')).join('\n'));
}


const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3, 3, 4);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard,bombBoard, 2, 2);
console.log('Updated Player Board:');
printBoard(playerBoard);
