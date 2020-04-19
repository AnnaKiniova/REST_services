// const allBoards = require('./boards.json');
const { UserError } = require('../../errorHandler');
const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const addBoard = async boardData => {
  const newBoard = await Board.create(boardData);
  // allBoards.push(newBoard);
  return newBoard;
};

const getBoardById = async id => {
  console.log('in find by Id');
  const boards = await Board.findOne({ _id: id });
  // return board;
  // const boards = allBoards.find(item => item.id === id);
  if (!boards) {
    throw new UserError(404, 'Board not found');
  }
  return boards;
};

const updateBoard = async (id, boardData) => {
  return Board.updateOne({ _id: id }, boardData);
  // const updatedBoard = await getBoardById(id);
  // Object.assign(updatedBoard, boardData);
  // return updatedBoard;
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
  // const index = allBoards.findIndex(item => item.id === id);
  // if (index === -1) {
  //   throw new UserError(404, 'Board not found');
  // }
  // allBoards.splice(index, 1);
  // return id;
};
module.exports = { getAll, addBoard, getBoardById, updateBoard, deleteBoard };
