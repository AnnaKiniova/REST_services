const allUsers = require('./users.json');

const getAll = () => {
  return allUsers;
};

const addUser = newUser => {
  allUsers.push(newUser);
  return newUser;
};

const getUserById = async id => {
  const result = await allUsers.find(item => item.id === id);
  return !result ? new Error({ message: 'no such user' }) : result;
};

const updateUser = async (id, userData) => {
  const updatedUser = await getUserById(id);
  Object.assign(updatedUser, userData);
  return updatedUser;
};

const deleteUser = async id => {
  await getUserById(id);
  allUsers.splice(id - 1, 1);
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
