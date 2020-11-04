const userServices = require('../users/user.service');

const authenticateUser = (login, password) =>
  userServices.findUserByLogin(login, password);

module.exports = { authenticateUser };
