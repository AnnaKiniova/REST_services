const allTasks = require('./tasks.json');
// const { UserError } = require('../../errorHandler');
// const mongoose = require('mongoose');
const Task = require('./task.model');

const getAll = async params => {
  return Task.find(z => z.boardId === params.boardId);
};

const addTask = async (taskData, params) => {
  const newTask = taskData;
  newTask.id = params.id;
  return Task.create(newTask);
};

const getTaskById = async id => {
  return Task.findById(id);
  //   const task = allTasks.find(item => item.id === id);
  //   if (!task) {
  //     throw new UserError(404, 'Task not found');
  //   }
  //   return task;
};

const updateTask = async (params, taskData) => {
  return Task.updateOne({ _id: params.id }, taskData);
  //   const updatedTask = await getTaskById(params.id);
  //   Object.assign(updatedTask, taskData);
  //   return updatedTask;
};

const deleteTask = async params => {
  return (await Task.deleteOne({ _id: params.id })).deletedCount;
  //   const index = allTasks.findIndex(item => item.id === params.id);
  //   if (index === -1) {
  //     throw new UserError(404, 'Task not found');
  //   }
  //   allTasks.splice(index, 1);
  //   return true;
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
