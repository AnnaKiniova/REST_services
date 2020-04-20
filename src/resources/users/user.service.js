const usersRepo = require('./user.memory.db');
const taskRepo = require('../task/task.db');

const getAll = () => usersRepo.getAll();

const createUser = userData => {
  return usersRepo.addUser(userData);
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
