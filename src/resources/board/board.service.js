const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const taskRepo = require('../task/task.memory.repository');
// const Joi = require('joi');

const getAll = () => boardRepo.getAll();

const createBoard = boardData => {
  const newBoard = new Board(boardData);
  return boardRepo.addBoard(newBoard);
};

const getBoardById = id => {
  return boardRepo.getBoardById(id);
};

const updateBoard = (id, boardData) => {
  return boardRepo.updateBoard(id, boardData);
};

const deleteBoard = async id => {
  const tasks = await taskRepo.getAll({ boardId: id });
  await Promise.all([
    tasks.map(task => {
      return taskRepo.deleteTask(task.id);
    })
  ]);

  return boardRepo.deleteBoard(id);
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
