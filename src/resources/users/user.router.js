const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const allUsers = await usersService.getAll();
    res.json(allUsers.map(User.toResponse));
  })
  .post(async (req, res) => {
    try {
      const newUser = await usersService.createUser(req.body);
      res.status(200).json(User.toResponse(newUser));
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const userFind = await usersService.getUserById(req.params.id);
      res.status(200).json(User.toResponse(userFind));
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  })
  .put(async (req, res) => {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);
    res.status(200).json(User.toResponse(updatedUser));
  })

  .delete(async (req, res) => {
    await usersService.deleteUser(req.params.id);
    res.status(204).end();
  });
module.exports = router;
