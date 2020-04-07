const allBoards = require('./boards.json');

const getAll = async () => {
  return allBoards;
};

const addBoard = async newBoard => {
  allBoards.push(newBoard);
  return newBoard;
};

const getBoardById = async id => {
  return allBoards.find(item => item.id === id);
};

const updateBoard = async (id, boardData) => {
  const updatedBoard = await getBoardById(id);
  Object.assign(updatedBoard, boardData);
  return updatedBoard;
};

const deleteBoard = async id => {
  const index = allBoards.findIndex(item => item.id === id);
  if (index !== -1) {
    allBoards.splice(index, 1);
    console.log(allBoards);
    return true;
  }
  return false;
};
module.exports = { getAll, addBoard, getBoardById, updateBoard, deleteBoard };
