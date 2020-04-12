const allBoards = require('./boards.json');
const { UserError } = require('../../errorHandler');

const getAll = async () => {
  return allBoards;
};

const addBoard = async newBoard => {
  allBoards.push(newBoard);
  return newBoard;
};

const getBoardById = async id => {
  const boards = allBoards.find(item => item.id === id);
  if (!boards) {
    throw new UserError(404, 'Board not found');
  }
  return boards;
};

const updateBoard = async (id, boardData) => {
  const updatedBoard = await getBoardById(id);
  Object.assign(updatedBoard, boardData);
  return updatedBoard;
};

const deleteBoard = async id => {
  const index = allBoards.findIndex(item => item.id === id);
  if (index === -1) {
    throw new UserError(404, 'Board not found');
  }
  allBoards.splice(index, 1);
  return true;
};
module.exports = { getAll, addBoard, getBoardById, updateBoard, deleteBoard };
