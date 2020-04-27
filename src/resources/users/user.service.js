const path = require('path');
const usersRepo = require(path.join(__dirname, './user.db'));
const taskRepo = require(path.join(__dirname, '../task/task.db'));

const { encryptPassword, checkPassword } = require('../../utils/encrypt');

const getAll = () => usersRepo.getAll();

const createUser = async userData => {
  const newPassword = await encryptPassword(userData.password);
  await Object.assign(userData, { password: newPassword });
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
  deleteUser,
  checkPassword
};
