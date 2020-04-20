const boardRepo = require('./board.db');
const taskRepo = require('../task/task.db');

const getAll = () => boardRepo.getAll();

const createBoard = boardData => {
  return boardRepo.addBoard(boardData);
};

const getBoardById = id => {
  return boardRepo.getBoardById(id);
};

const updateBoard = (id, boardData) => {
  return boardRepo.updateBoard(id, boardData);
};

const deleteBoard = async id => {
  await taskRepo.creanUpBoard(id);
  return boardRepo.deleteBoard(id);
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
