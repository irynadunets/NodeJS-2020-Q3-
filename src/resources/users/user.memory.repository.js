const User = require('./user.model');

//let users = [];
//users.push(new User(), new User(), new User());

const getAll = async () => users;

const getUser = async id => users.find(el => el.id === id);

const createUser = async user => {
  const createdUser = new User(user);
  users.push(createdUser);
  return createdUser;
};

const updateUser = async (id, updatedUser) => {
  const user = users.find(el => el.id === id);
  if (user) {
    user.name = updatedUser.name;
    user.login = updatedUser.login;
    user.password = updatedUser.password;
    return user;
  }
  return users;
};

const deleteUser = async id => {
  return users.filter(el => el.id !== id);
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
