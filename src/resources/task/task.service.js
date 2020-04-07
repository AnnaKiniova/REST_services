const taskRepo = require('./task.memory.repository');

const Task = require('./task.model');

const getAll = params => taskRepo.getAll(params);

const getTaskById = id => taskRepo.getTaskById(id);

const createTask = (taskData, params) => {
  const newTask = new Task(taskData);
  newTask.boardId = params.boardId;
  return taskRepo.addTask(newTask);
};

const updateTask = (params, taskData) => {
  return taskRepo.updateTask(params, taskData);
};

const deleteTask = params => taskRepo.deleteTask(params);

module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };
