const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { handleError } = require('../../errorHandler');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await taskService.getAll(req.params);
    res
      .status(200)
      .json(tasks)
      .end();
  })
  .post(async (req, res) => {
    const newTask = await taskService.createTask(req.body, req.params);
    if (newTask) {
      res
        .status(200)
        .json(newTask)
        .end();
    } else {
      res.status(400).end('Bad request');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const requiredTask = await taskService.getTaskById(req.params.id);
    if (requiredTask) {
      res.status(200).json(requiredTask);
    } else {
      res.status(404).end();
    }
  })
  .put(async (req, res) => {
    const newTask = await taskService.updateTask(req.params, req.body);
    if (newTask) {
      res.status(200).json(newTask);
    } else {
      res.status(400).end('Bad request');
    }
  })
  .delete(async (req, res) => {
    const deletedTask = await taskService.deleteTask(req.params);
    if (deletedTask) {
      res.status(204).end('The task has been deleted');
    } else {
      res.status(404).end('Task not found');
    }
  });

// eslint-disable-next-line no-unused-vars
router.use((e, req, res, next) => {
  handleError(e, res);
});

module.exports = router;
