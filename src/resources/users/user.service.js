const usersRepo = require('./user.db');
const taskRepo = require('../task/task.db');

const HttpStatus = require('http-status-codes');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = () => usersRepo.getAll();

const encryptPassword = async plainPassword => {
  const encryptedPassword = await new Promise((res, rej) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) {
        rej(new Error(HttpStatus.BAD_REQUEST, 'Password was not encrypted'));
      }
      console.log(`error: ${err}, hash: ${hash}`);
      res(hash);
    });
  });
  return encryptedPassword;
};

const checkPassword = async (user, password) => {
  console.log(`###user: ${user},  password: ${password}`);
  const match = await bcrypt.compare(password, user.password);
  return match;

  // const match = await new Promise((resolve, reject) =>
  //   bcrypt.compare(password, user.password, (err, result) => {
  //     console.log(err);
  //     if (err) reject(err);
  //     else resolve(result);
  //   })
  // );
  // console.log('----++');
  // console.log(match);
  // return match;
};

const createUser = async userData => {
  console.log(userData.password);
  const newPassword = await encryptPassword(userData.password);
  console.log(newPassword);
  await Object.assign(userData, { password: newPassword });
  console.log(userData);
  return usersRepo.addUser(userData);
};
const getUserById = id => usersRepo.getUserById(id);

const updateUser = (id, userData) => {
  return usersRepo.updateUser(id, userData);
};

const deleteUser = async id => {
  await taskRepo.cleanUpUser(id);
  return usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  checkPassword
};
