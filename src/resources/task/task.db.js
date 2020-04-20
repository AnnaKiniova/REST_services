const path = require('path');
const HttpStatus = require('http-status-codes');

const { UserError } = require(path.join(__dirname, '../../errorHandler'));
const Task = require(path.join(__dirname, './task.model'));

const ENTITY_NAME = 'task';

const getAll = async params => {
  return Task.find({ boardId: params.boardId });
};

const addTask = async newTask => {
  return Task.create(newTask);
};

const getTaskById = async params => {
  const task = await Task.findOne({ _id: params.id, boardId: params.boardId });
  if (!task) {
    throw new UserError(HttpStatus.NOT_FOUND, `${ENTITY_NAME} not found`);
  }
  return task;
};

const updateTask = async (params, taskData) => {
  return Task.updateOne({ _id: params.id }, taskData);
};

const deleteTask = async params => {
  return Task.deleteOne({ _id: params.id });
};

const cleanUpUser = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

const creanUpBoard = async id => {
  return (await Task.deleteMany({ boardId: id })).deletedCount;
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
