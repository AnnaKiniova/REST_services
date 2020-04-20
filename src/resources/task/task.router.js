/* eslint-disable callback-return */
const path = require('path');
const router = require('express').Router({ mergeParams: true });
const HttpStatus = require('http-status-codes');

const taskService = require(path.join(__dirname, './task.service'));
const Task = require(path.join(__dirname, './task.model'));
const asyncWrap = require(path.join(__dirname, '../../async_wrap'));
const { UserError } = require(path.join(__dirname, '../../errorHandler'));

const ENTITY_NAME = 'task';

router
  .route('/')
  .get(
    asyncWrap(async (req, res) => {
      const tasks = await taskService.getAll(req.params);
      res
        .status(HttpStatus.OK)
        .json(tasks.map(Task.toResponse))
        .end();
    })
  )
  .post(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      const newTask = await taskService.createTask(req.body, req.params);
      res
        .status(HttpStatus.OK)
        .json(Task.toResponse(newTask))
        .end();
    })
  );

router
  .route('/:id')
  .get(
    asyncWrap(async (req, res) => {
      const requiredTask = await taskService.getTaskById(req.params);
      res.status(HttpStatus.OK).json(Task.toResponse(requiredTask));
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      const newTask = await taskService.updateTask(req.params, req.body);
      res.status(HttpStatus.OK).json(Task.toResponse(newTask));
    })
  )
  .delete(
    asyncWrap(async (req, res) => {
      const task = await taskService.deleteTask(req.params);
      if (!task.deletedCount) {
        throw new UserError(HttpStatus.NOT_FOUND, `${ENTITY_NAME} not found`);
      }
      res
        .status(HttpStatus.NO_CONTENT)
        .end(`The ${ENTITY_NAME} has been deleted`);
    })
  );

module.exports = router;
