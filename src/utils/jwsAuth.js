const path = require('path');
const { UserError } = require(path.join(__dirname, '../errorHandler'));
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config');
const { checkPassword } = require('../resources/users/user.service');
// // const router = require('express').Router();
// const HttpStatus = require('http-status-codes');]

const userRepo = require(path.join(__dirname, '../resources/users/user.db'));

const getToken = async (req, res) => {
  console.log(req.body.name);
  if (!req.body.name) {
    throw new UserError(HttpStatus.BAD_REQUEST, 'No data entered');
  }
  const user = await userRepo.getUserByName(req.body.name);
  const isPasswordValid = await checkPassword(user, req.body.password);
  console.log(isPasswordValid);
  const payload = req.body.password;
  console.log(payload);
  const token = jwt.sign(payload, JWT_SECRET_KEY);
  console.log(token);
  res.send({ token });
};

const loginCheck = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  // const user = await userRepo.getUserByName(req.body.name);

  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        res.status(HttpStatus.FORBIDDEN);
        throw new Error(HttpStatus.FORBIDDEN, '');
      }
      next();
    });
  }
};

module.exports = { loginCheck, getToken };
