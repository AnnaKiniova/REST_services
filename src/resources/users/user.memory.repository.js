const allUsers = require('./users.json');

const getAll = async () => {
  return await allUsers;
};

const addUser = newUser => {
  allUsers.push(newUser);
  return newUser;
};

const getUserById = async id => {
  return await allUsers.find(item => item.id === id);
};

const updateUser = async (id, userData) => {
  const updatedUser = await getUserById(id);
  Object.assign(updatedUser, userData);
  return updatedUser;
};

const deleteUser = async id => {
  const index = allUsers.findIndex(item => item.id === id);
  if (index) {
    allUsers.splice(index - 1, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
