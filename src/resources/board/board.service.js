const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const Joi = require('joi');

const getAll = () => boardRepo.getAll();

const createBoard = async boardData => {
  if (validateData(boardData)) {
    const newBoard = new Board(boardData);
    return await boardRepo.addBoard(newBoard);
  }
};
const validateData = input => {
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    columns: Joi.array()
  });
  const result = schema.validate(input);
  if (result.error) {
    throw new Error({ message: 'invalid data provided' });
  }
  return !result.error;
};

module.exports = { getAll, createBoard };

// const createUser = async userData => {
//   if (validateUser(userData)) {
//     const newUser = new User(userData);
//     return await usersRepo.addUser(newUser);
//   }
// };
// const getUserById = async id => await usersRepo.getUserById(id);

// const updateUser = async (id, userData) => {
//   if (validateUser(userData)) {
//     return await usersRepo.updateUser(id, userData);
//   }
// };

// const deleteUser = async id => usersRepo.deleteUser(id);
