/* eslint-disable callback-return */
const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

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
  .get(async (req, res, next) => {
    try {
      const requiredTask = await taskService.getTaskById(req.params.id);
      res.status(200).json(requiredTask);
    } catch (e) {
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const newTask = await taskService.updateTask(req.params, req.body);
      res.status(200).json(newTask);
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await taskService.deleteTask(req.params);
      res.status(204).end('The task has been deleted');
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
