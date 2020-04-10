const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { handleError } = require('../../errorHandler');

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
  .get(async (req, res, next) => {
    try {
      const userFind = await usersService.getUserById(req.params.id);
      res.status(200).json(User.toResponse(userFind));
    } catch (e) {
      // eslint-disable-next-line callback-return
      next(e);
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

  .delete(async (req, res, next) => {
    try {
      await usersService.deleteUser(req.params.id);
      res.status(204).json('The user has been deleted');
    } catch (e) {
      // eslint-disable-next-line callback-return
      next(e);
    }
  });

// eslint-disable-next-line no-unused-vars
router.use((e, req, res, next) => {
  handleError(e, res);
});

module.exports = router;
