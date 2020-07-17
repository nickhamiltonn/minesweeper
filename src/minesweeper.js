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

    board[randomRowIndex][randomColIndex] = 'B';
    numberOfBombsPlaced++;
  }

  return board;
};


// function to print board
const printBoard = board => {
  console.log(board.map(row =>
    row.join(' | ')).join('\n'));
}


const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
