const allboards = require('./boards.json');

const getAll = () => {
  return allboards;
};

const addBoard = async newBoard => {
  await allboards.push(newBoard);
  return newBoard;
};

module.exports = { getAll, addBoard };
