const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

module.exports = { getAll };
