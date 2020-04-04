const allUsers = require('./users.json');

const getAll = () => {
  return allUsers;
};

const addUser = newUser => {
  allUsers.push(newUser);
  console.log(allUsers);
};

const findUser = id => {
  console.log(allUsers);
  const result = allUsers.find(item => item.id === id);
  console.log(result);
  return result === undefined ? new Error('no such user') : result;
};

module.exports = { getAll, addUser, findUser };
