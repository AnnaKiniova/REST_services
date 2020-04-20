const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const addUser = async newUser => {
  return User.create(newUser);
};

const getUserById = async id => {
  return User.findOne({ _id: id });
};

const updateUser = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
