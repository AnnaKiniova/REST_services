const taskRepo = require('./task.db');

const Task = require('./task.model');

const getAll = params => taskRepo.getAll(params);

const getTaskById = (body, params) => taskRepo.getTaskById(body, params);

const createTask = async (body, params) => {
  const newTask = new Task(body);
  newTask.boardId = params.boardId;
  return taskRepo.addTask(newTask);
};

const updateTask = (params, taskData) => {
  return taskRepo.updateTask(params, taskData);
};

const deleteTask = params => taskRepo.deleteTask(params);

module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };
