const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getBoard = async id => {
  return Board.findOne({ _id: id });
};

const createBoard = async  board  => {
  return Board.create(board);
};

const updateBoard = async (id, updatedBoard) => {
  return Board.update({ _id: id }, updatedBoard);
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
