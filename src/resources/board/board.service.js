const boardRepo = require('./board.db');
// const Board = require('./board.model');
const taskRepo = require('../task/task.db');

const getAll = () => boardRepo.getAll();

const createBoard = boardData => {
  // const newBoard = new Board(boardData);
  return boardRepo.addBoard(boardData);
};

const getBoardById = id => {
  return boardRepo.getBoardById(id);
};

const updateBoard = (id, boardData) => {
  return boardRepo.updateBoard(id, boardData);
};

const deleteBoard = async id => {
  const tasks = await taskRepo.getAll({ _id: id });
  await boardRepo.deleteBoard(id);
  await Promise.all([
    tasks.map(task => {
      return taskRepo.deleteTask(task);
    })
  ]);
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
