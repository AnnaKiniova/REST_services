const path = require('path');
const User = require(path.join(__dirname, './user.model'));

const { UserError } = require(path.join(__dirname, '../../errorHandler'));
const ENTITY_NAME = 'user';

const getAll = async () => {
  return User.find({});
};

const addUser = async newUser => {
  return User.create(newUser);
};

const getUserById = async id => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new UserError(404, `${ENTITY_NAME} not found`);
  }
  return user;
};

const updateUser = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
