const Board = require('./board.model');

//let boards = [];
//boards.push(new Board(), new Board(), new Board());

const getAll = async () => boards;

const getBoard = async id => boards.find(item => item.id === id);

const createBoard = async ( board ) => {
  const createdBoard = new Board(board);
  boards.push(createdBoard);
  return createdBoard;
};

const updateBoard = async (id, updatedBoard) => {
  const board = boards.find(el => el.id === id);
  if (board) {
    board.columns = updatedBoard.columns,
    board.title = updatedBoard.title;
    return board;
  }
  return boards;
};

const deleteBoard = async id => {
  const index = boards.findIndex(item => item.id === id);
  if (index < 0) return false;
  boards.splice(index, 1);
  return true;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
