const usersRepo = require('./user.memory.repository');
const taskRepo = require('../task/task.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const createUser = userData => {
  const newUser = new User(userData);
  return usersRepo.addUser(newUser);
};
const getUserById = id => usersRepo.getUserById(id);

const updateUser = (id, userData) => {
  return usersRepo.updateUser(id, userData);
};

const deleteUser = async id => {
  await taskRepo.cleanUpUser(id);
  return usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  getUserById,
  updateUser,
  createUser,
  deleteUser
};
