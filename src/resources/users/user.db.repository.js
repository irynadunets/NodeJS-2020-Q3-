const User = require('./user.model');

const getAll = async () => {
  return await User.find({});
}

const getUser = async id => {
  return await User.findOne({ _id: id });
}

const findUserByLogin = async _login => {
  return User.findOne({ login: _login });
};

const createUser = async user => {
  return User.create(user);
};

const updateUser = async (userId, user) => {
  return User.findOneAndUpdate({ _id: userId }, user, {
    new: true
  });
};

const deleteUser = async id => User.deleteOne({ _id: id });

module.exports = { getAll, getUser, findUserByLogin, createUser, updateUser, deleteUser };
