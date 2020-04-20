const path = require('path');
const HttpStatus = require('http-status-codes');

const { UserError } = require(path.join(__dirname, '../../errorHandler'));
const Board = require(path.join(__dirname, './board.model'));
const ENTITY_NAME = 'board';

const getAll = async () => {
  return Board.find({});
};

const addBoard = async boardData => {
  return await Board.create(boardData);
};

const getBoardById = async id => {
  const boards = await Board.findOne({ _id: id });
  if (!boards) {
    throw new UserError(HttpStatus.NOT_FOUND, `${ENTITY_NAME} ${id} not found`);
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
