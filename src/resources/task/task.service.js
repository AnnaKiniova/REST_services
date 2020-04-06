const taskRepo = require('./task.memory.repository');

const Task = require('./task.model');

const getAll = () => taskRepo.getAll();

const getTaskById = async id => await taskRepo.getTaskById(id);

const createTask = async (taskData, params) => {
  const newTask = new Task(taskData);
  newTask.boardId = params.boardId;
  return await taskRepo.addTask(newTask);
};

const updateTask = async (params, taskData) => {
  return await taskRepo.updateTask(params, taskData);
};

const deleteTask = async params => await taskRepo.deleteTask(params);

module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };
