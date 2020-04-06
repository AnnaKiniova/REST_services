const Joi = require('joi');

const usersRepo = require('./user.memory.repository');
const taskRepo = require('../task/task.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const createUser = async userData => {
  if (validateUser(userData)) {
    const newUser = new User(userData);
    return await usersRepo.addUser(newUser);
  }
};
const getUserById = id => usersRepo.getUserById(id);

const updateUser = async (id, userData) => {
  if (validateUser(userData)) {
    return await usersRepo.updateUser(id, userData);
  }
};

const deleteUser = async id => {
  await taskRepo.cleanUpUser(id);
  return await usersRepo.deleteUser(id);
};

const validateUser = input => {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  });
  const result = schema.validate(input);
  // if (result.error) {
  //   throw new Error({ message: 'invalid data provided' });
  // }
  return !result.error;
};

module.exports = {
  getAll,
  validateUser,
  getUserById,
  updateUser,
  createUser,
  deleteUser
};
