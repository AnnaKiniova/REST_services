const router = require('express').Router({ mergeParams: true });
// const Task = require('./task.model');
const taskService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await taskService.getAll();
    res
      .status(200)
      .json(tasks)
      .end();
  })
  .post(async (req, res) => {
    try {
      // console.log(req.params);
      const newTask = await taskService.createTask(req.body, req.params);

      res
        .status(200)
        .json(newTask)
        .end();
    } catch (e) {
      res
        .status(400)
        .json(e)
        .end();
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
    res.status(200).json(newTask);
  })
  .delete(async (req, res) => {
    console.log('in delete route');

    console.log(req.params);
    const deletedTask = await taskService.deleteTask(req.params);
    if (deletedTask) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
