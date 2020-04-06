const allBoards = require('./boards.json');

const getAll = () => {
  return allBoards;
};

const addBoard = async newBoard => {
  await allBoards.push(newBoard);
  return newBoard;
};

const getBoardById = id => {
  return allBoards.find(item => item.id === id);
};

const updateBoard = async (id, boardData) => {
  const updatedBoard = await getBoardById(id);
  Object.assign(updatedBoard, boardData);
  return updatedBoard;
};

const deleteBoard = id => {
  const index = allBoards.findIndex(item => item.id === id);
  if (index !== -1) {
    allBoards.splice(index, 1);
    console.log(allBoards);
    return true;
  }
  return false;
};
module.exports = { getAll, addBoard, getBoardById, updateBoard, deleteBoard };
