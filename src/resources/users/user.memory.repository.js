const allUsers = require('./users.json');

const getAll = () => {
  return allUsers;
};

const addUser = newUser => {
  console.log(newUser);
  console.log(JSON.stringify(newUser));
  allUsers.push(newUser);
  console.log(allUsers);
};

module.exports = { getAll, addUser };
