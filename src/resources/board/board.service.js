const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const taskRepo = require('../task/task.memory.repository');

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
