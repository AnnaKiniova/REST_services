// const allUsers = require('./users.json');
const User = require('./user.model');
// const { UserError } = require('../../errorHandler');

const getAll = async () => {
  return User.find({});
};

const addUser = async newUser => {
  return User.create(newUser);
};

const getUserById = async id => {
  return User.findOne({ _id: id });
  // const requiredUser = allUsers.find(item => item.id === id);
  // if (!requiredUser) {
  //   throw new UserError(404, 'User not found');
  // }
  // return requiredUser;
};

const updateUser = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
  // const updatedUser = await getUserById(id);
  // Object.assign(updatedUser, userData);
  // return updatedUser;
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
  // const index = allUsers.findIndex(item => item.id === id);
  // if (index === -1) {
  //   throw new UserError(404, 'User not found');
  // }
  // allUsers.splice(index, 1);
  // return true;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
