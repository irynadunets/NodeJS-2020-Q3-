const Task = require('./task.model');

let tasks = [];
tasks.push(new Task(), new Task(), new Task());

const getAll = async () => tasks;

const getTasksByBoard = async boardId =>  tasks.filter(el => el.boardId === boardId);

const getTask = async id => tasks.find(el => el.id === id);

const createTask = async ( task ) => {
  const createdTask = new Task(task);
  tasks.push(createdTask);
  return createdTask;
};

const updateTask = async (boardId, taskId, task) => {
  const index = tasks.findIndex(el => el.id === taskId);
  const updatedTask = { ...tasks[index], ...task };
  tasks[index] = updatedTask;
  return updatedTask;
};

const deleteTask = async id => {
  const index = tasks.findIndex(item => item.id === id);
  if (index < 0) return false;
  tasks.splice(index, 1);
  return true;
};


module.exports = { getAll, getTask, createTask, updateTask, deleteTask, getTasksByBoard };
