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
  console.log(id);
  const result = allUsers[0];
  console.log(Object.assign(result, userData));
  Object.assign(result, userData);

  // const userToUpdate = await findUser(id);
  // console.log(userToUpdate);
  // Object.assign(userToUpdate, userData);
  // console.log(userToUpdate);
  // return userToUpdate;
  // Object.assign(result, userData);
  console.log(Object.assign(result, userData));
  return Object.assign(result, userData);
};

const deleteUser = async id => {
  console.log(id);
};
module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
