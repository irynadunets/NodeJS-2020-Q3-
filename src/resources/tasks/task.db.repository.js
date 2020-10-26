const Task = require('./task.model');

const getAll = async () => {
  return Task.find({});
};

const getTasksByBoard = async _boardId => {
  return Task.find({ boardId: _boardId });
};

const getTask = async id => {
  return Task.findOne({ _id: id });
};

const createTask = async  task  => {
  return Task.create(task);
};

const updateTask = async (boardId, taskId, task) =>
  Task.updateOne({ _id: taskId }, task);

const deleteTask = async id => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getTask, createTask, updateTask, deleteTask, getTasksByBoard };
