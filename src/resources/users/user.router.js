const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

const asyncWrap = require('../../async_wrap');

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
  .get(
    asyncWrap(async (req, res) => {
      const userFind = await usersService.getUserById(req.params.id);
      res.status(200).json(User.toResponse(userFind));
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      const updatedUser = await usersService.updateUser(
        req.params.id,
        req.body
      );
      res.status(200).json(User.toResponse(updatedUser));
    })
  )

  .delete(
    asyncWrap(async (req, res) => {
      await usersService.deleteUser(req.params.id);
      res.status(204).json('The user has been deleted');
    })
  );
module.exports = router;
