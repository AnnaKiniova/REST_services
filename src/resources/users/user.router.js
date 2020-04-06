const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const allUsers = await usersService.getAll();
    res.status(200).json(allUsers.map(User.toResponse));
  })
  .post(async (req, res) => {
    const newUser = await usersService.createUser(req.body);
    if (newUser) {
      res.status(200).json(User.toResponse(newUser));
    } else {
      res.status(400).end('bad request');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const userFind = await usersService.getUserById(req.params.id);
    if (userFind) {
      res.status(200).json(User.toResponse(userFind));
    } else {
      res.status(404).end('user not found');
    }
  })
  .put(async (req, res) => {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(User.toResponse(updatedUser));
    } else {
      res.status(400).end('bad request');
    }
  })

  .delete(async (req, res) => {
    const isDeleted = await usersService.deleteUser(req.params.id);
    if (isDeleted) {
      res.status(204).end('The user has been deleted');
    } else {
      res.status(404).end('User not found');
    }
  });

module.exports = router;
