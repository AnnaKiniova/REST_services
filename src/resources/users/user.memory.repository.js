const allUsers = require('./users.json');
const { UserError } = require('../../errorHandler');

const getAll = async () => {
  return allUsers;
};

const addUser = async newUser => {
  allUsers.push(newUser);
  return newUser;
};

const getUserById = async id => {
  const requiredUser = allUsers.find(item => item.id === id);
  if (!requiredUser) {
    throw new UserError(404, 'User not found');
  }
  return requiredUser;
};

const updateUser = async (id, userData) => {
  const updatedUser = await getUserById(id);
  Object.assign(updatedUser, userData);
  return updatedUser;
};

const deleteUser = async id => {
  const index = allUsers.findIndex(item => item.id === id);
  if (index === -1) {
    throw new UserError(404, 'User not found');
  }
  allUsers.splice(index, 1);
  return true;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
