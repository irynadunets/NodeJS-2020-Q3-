const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.getUser(id);
const create = user => usersRepo.createUser(user);
const update = (id, user) => usersRepo.updateUser(id, user);

const remove = async id => {
  const tasks = await tasksService.getAll();
  const updatedTasks = tasks.filter(el => el.userId === id)
  .map(el => tasksService.update(null, el.id, { userId: null }));  
  return  Promise.all([
    updatedTasks,
    usersRepo.deleteUser(id)
  ]);
};

module.exports = { getAll, get, create, update, remove };
