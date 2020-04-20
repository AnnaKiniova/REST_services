const path = require('path');
const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const User = require(path.join(__dirname, './user.model'));
const usersService = require(path.join(__dirname, './user.service'));

const asyncWrap = require(path.join(__dirname, '../../async_wrap'));
const { UserError } = require(path.join(__dirname, '../../errorHandler'));

const ENTITY_NAME = 'user';

router
  .route('/')
  .get(async (req, res) => {
    const allUsers = await usersService.getAll();
    res.status(HttpStatus.OK).json(allUsers.map(User.toResponse));
  })
  .post(
    asyncWrap(async (req, res) => {
      if (!req.body.name || !req.body.login || !req.body.password) {
        throw new UserError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      const newUser = await usersService.createUser(req.body);
      res.status(HttpStatus.OK).json(User.toResponse(newUser));
    })
  );

router
  .route('/:id')
  .get(
    asyncWrap(async (req, res) => {
      const userFind = await usersService.getUserById(req.params.id);
      res.status(HttpStatus.OK).json(User.toResponse(userFind));
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      if (!req.body.name || !req.body.login || !req.body.password) {
        throw new UserError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      const updatedUser = await usersService.updateUser(
        req.params.id,
        req.body
      );
      res.status(HttpStatus.OK).json(User.toResponse(updatedUser));
    })
  )

  .delete(
    asyncWrap(async (req, res) => {
      const deletedUser = await usersService.deleteUser(req.params.id);
      if (!deletedUser) {
        throw new UserError(HttpStatus.NOT_FOUND, `${ENTITY_NAME} not found`);
      }

      res
        .status(HttpStatus.NO_CONTENT)
        .json(`The ${ENTITY_NAME} has been deleted`);
    })
  );
module.exports = router;
