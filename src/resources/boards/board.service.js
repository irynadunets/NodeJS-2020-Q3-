const taskService = require('../tasks/task.db.repository');
const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.getBoard(id);
const create = board => boardsRepo.createBoard(board);
const update = (id, board) => boardsRepo.updateBoard(id, board);

const remove = async id => {
  const tasks = await taskService.getAll();
  const delatedTasks = tasks.filter(item => item.boardId === id)
  .map(item => taskService.deleteTask(item.id));
  return Promise.all([
    delatedTasks,
    boardsRepo.deleteBoard(id)
  ]);
};

module.exports = { getAll, get, create, update, remove };
