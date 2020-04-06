const allTasks = require('./tasks.json');

const getAll = async () => {
  return await allTasks;
};

const addTask = newTask => {
  allTasks.push(newTask);
  return newTask;
};

const getTaskById = async id => {
  return await allTasks.find(item => item.id === id);
};

const updateTask = async (params, taskData) => {
  const updatedTask = await getTaskById(params.id);
  Object.assign(updatedTask, taskData);
  return updatedTask;
};

const deleteTask = async params => {
  const index = await allTasks.findIndex(item => item.id === params.id);
  if (index !== -1) {
    allTasks.splice(index, 1);
    return true;
  }
  return false;
};

const cleanUpUser = async userId => {
  const tasksToUpdate = await allTasks.filter(item => item.userId === userId);
  tasksToUpdate.map(item => Object.assign(item, { userId: null }));
};

const creanUpBoard = async id => {
  const tasksToDelete = await allTasks.filter(item => item.boardId === id);
  await tasksToDelete.map(item => deleteTask(item.id));
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
