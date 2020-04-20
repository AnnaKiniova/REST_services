const { UserError } = require('../../errorHandler');
const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const addBoard = async boardData => {
  return await Board.create(boardData);
};

const getBoardById = async id => {
  const boards = await Board.findOne({ _id: id });
  if (!boards) {
    throw new UserError(404, 'Board not found');
  }
  return boards;
};

const updateBoard = async (id, boardData) => {
  return Board.updateOne({ _id: id }, boardData);
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, addBoard, getBoardById, updateBoard, deleteBoard };
