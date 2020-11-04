const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');
const { hashPassword } = require('../../common/hashHelper')

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.getUser(id);
const findUserByLogin = login => usersRepo.findUserByLogin(login);
const create = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  return usersRepo.createUser({ ...user, password: hashedPassword });
};
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

module.exports = { getAll, get, findUserByLogin, create, update, remove };
