const allUsers = require('./users.json');
// [
//   {
//     id: '1',
//     name: 'User1',
//     login: 'User1 login',
//     password: 'password1'
//   },
//   {
//     id: '2',
//     name: 'User2',
//     login: 'User2 login',
//     password: 'password2'
//   },
//   {
//     id: '3',
//     name: 'User3',
//     login: 'User3 login',
//     password: 'password3'
//   }
// ];

const getAll = () => {
  return allUsers;
};

const addUser = newUser => {
  allUsers.push(newUser);
  return newUser;
  // console.log(allUsers);
};

const getUserById = async id => {
  // console.log(allUsers);
  const result = await allUsers.find(item => item.id === id);
  // console.log(result);
  return !result ? new Error('no such user') : result;
};

const updateUser = async (id, userData) => {
  const updatedUser = await getUserById(id);
  console.log(updatedUser);
  Object.assign(updatedUser, userData);
  console.log(Object.assign(updatedUser, userData));
  return updatedUser;
};

const deleteUser = async id => {
  await getUserById(id);
  allUsers.splice(id - 1, 1);
  console.log(id);
  console.log(allUsers);
  // return;
};
module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
