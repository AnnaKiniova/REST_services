const taskRepo = require('./task.memory.repository');
// const Joi = require('joi');
const Task = require('./task.model');

const getAll = () => taskRepo.getAll();

const getTaskById = async id => await taskRepo.getTaskById(id);

const createTask = async (taskData, params) => {
  const newTask = new Task(taskData);
  newTask.boardId = params.boardId;
  return await taskRepo.addTask(newTask);
};

const updateTask = async (params, taskData) => {
  //   if (validateUser(userData))
  return await taskRepo.updateTask(params, taskData);
  //   }
};

const deleteTask = async params => await taskRepo.deleteTask(params);

// const validateData = input => {
//   const schema = Joi.object({
//     id: Joi.string(),
//     title: Joi.string().required(),
//     order: Joi.number().required(),
//     description: Joi.string().required(),
//     userId: Joi.any().required(),
//     boardId: Joi.any(),
//     columnId: Joi.string().required()
//   });

//   const result = schema.validate(input);
//   if (result.error) {
//     throw new Error({ message: 'invalid data provided' });
//   }
//   return !result.error;
// };

module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };
