const tasksRepo = require('./task.db.repository');

const getAll = () => tasksRepo.getAll();
const getTasksByBoard = boadId => tasksRepo.getTasksByBoard(boadId);
const get = id => tasksRepo.getTask(id);
const create = task => tasksRepo.createTask(task);
const update = (boardId, id, task) => tasksRepo.updateTask(boardId, id, task);
const remove = id => tasksRepo.deleteTask(id);

module.exports = { getAll, getTasksByBoard, get, create, update, remove };
