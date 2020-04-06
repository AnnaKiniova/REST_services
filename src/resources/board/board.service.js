const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const taskRepo = require('../task/task.memory.repository');
const Joi = require('joi');

const getAll = () => boardRepo.getAll();

const createBoard = async boardData => {
  if (validateData(boardData)) {
    const newBoard = new Board(boardData);
    return await boardRepo.addBoard(newBoard);
  }
};

const getBoardById = async id => {
  return await boardRepo.getBoardById(id);
};

const updateBoard = async (id, boardData) => {
  if (validateData(boardData)) {
    return await boardRepo.updateBoard(id, boardData);
  }
};

const deleteBoard = async id => {
  await taskRepo.creanUpBoard(id);
  return await boardRepo.deleteBoard(id);
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

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
