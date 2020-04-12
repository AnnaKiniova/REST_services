/* eslint-disable callback-return */
const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

const asyncWrap = require('../../async_wrap');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await taskService.getAll(req.params);
    res
      .status(200)
      .json(tasks)
      .end();
  })
  .post(async (req, res, next) => {
    try {
      const newTask = await taskService.createTask(req.body, req.params);
      res
        .status(200)
        .json(newTask)
        .end();
    } catch (e) {
      next(e);
    }
  });

router
  .route('/:id')
  .get(
    asyncWrap(async (req, res) => {
      const requiredTask = await taskService.getTaskById(req.params.id);
      res.status(200).json(requiredTask);
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      const newTask = await taskService.updateTask(req.params, req.body);
      res.status(200).json(newTask);
    })
  )
  .delete(
    asyncWrap(async (req, res) => {
      await taskService.deleteTask(req.params);
      res.status(204).end('The task has been deleted');
    })
  );

module.exports = router;
