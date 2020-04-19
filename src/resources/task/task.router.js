/* eslint-disable callback-return */
const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');

const asyncWrap = require('../../async_wrap');
const { UserError } = require('../../errorHandler');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await taskService.getAll(req.params);
    res
      .status(200)
      .json(tasks.map(Task.toResponse))
      .end();
  })
  .post(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(400, 'Bad request');
      }
      const newTask = await taskService.createTask(req.body, req.params);
      res
        .status(200)
        .json(Task.toResponse(newTask))
        .end();
    })
  );

router
  .route('/:id')
  .get(
    asyncWrap(async (req, res) => {
      const requiredTask = await taskService.getTaskById(req.body, req.params);
      // console.log(req.params);
      res.status(200).json(Task.toResponse(requiredTask));
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(400, 'Bad request');
      }
      const newTask = await taskService.updateTask(req.params, req.body);
      res.status(200).json(Task.toResponse(newTask));
    })
  )
  .delete(
    asyncWrap(async (req, res) => {
      if (!(await taskService.deleteTask(req.params))) {
        throw new UserError(404, 'Task not found');
      }
      res.status(204).end('The task has been deleted');
    })
  );

module.exports = router;
