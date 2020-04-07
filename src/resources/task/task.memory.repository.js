const allTasks = require('./tasks.json');

const getAll = async params => {
  return allTasks.filter(z => z.boardId === params.boardId);
};

const addTask = async newTask => {
  allTasks.push(newTask);
  return newTask;
};

const getTaskById = async id => {
  return allTasks.find(item => item.id === id);
};

const updateTask = async (params, taskData) => {
  const updatedTask = await getTaskById(params.id);
  Object.assign(updatedTask, taskData);
  return updatedTask;
};

const deleteTask = async params => {
  const index = allTasks.findIndex(item => item.id === params.id);
  if (index !== -1) {
    allTasks.splice(index, 1);
    return true;
  }
  return false;
};

const cleanUpUser = async userId => {
  const tasksToUpdate = await allTasks.filter(item => item.userId === userId);
  tasksToUpdate.map(item => Object.assign(item, { userId: null }));
  return true;
};

const creanUpBoard = async id => {
  const tasksToDelete = await allTasks.filter(item => item.boardId === id);
  tasksToDelete.map(item => deleteTask(item.id));
  return true;
};

module.exports = {
  getAll,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
  cleanUpUser,
  creanUpBoard
};
