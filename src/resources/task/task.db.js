const allTasks = require('./tasks.json');
const { UserError } = require('../../errorHandler');

const getAll = async params => {
  return allTasks.filter(z => z.boardId === params.boardId);
};

const addTask = async newTask => {
  allTasks.push(newTask);
  return newTask;
};

const getTaskById = async id => {
  const task = allTasks.find(item => item.id === id);
  if (!task) {
    throw new UserError(404, 'Task not found');
  }
  return task;
};

const updateTask = async (params, taskData) => {
  const updatedTask = await getTaskById(params.id);
  Object.assign(updatedTask, taskData);
  return updatedTask;
};

const deleteTask = async params => {
  const index = allTasks.findIndex(item => item.id === params.id);
  if (index === -1) {
    throw new UserError(404, 'Task not found');
  }
  allTasks.splice(index, 1);
  return true;
};

const cleanUpUser = async userId => {
  const tasksToUpdate = await allTasks.filter(item => item.userId === userId);
  tasksToUpdate.map(item => Object.assign(item, { userId: null }));
  return true;
};

const creanUpBoard = async id => {
  const tasksToDelete = await allTasks.filter(item => item.boardId === id);
  await tasksToDelete.map(item => deleteTask(item));
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
