const path = require('path');
const { UserError } = require(path.join(__dirname, '../errorHandler'));
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require(path.join(__dirname, '../common/config'));
const { checkPassword } = require(path.join(
  __dirname,
  '../resources/users/user.service'
));

const userRepo = require(path.join(__dirname, '../resources/users/user.db'));

const validateLogin = req => {
  if (!(req.body.login && req.body.password)) {
    throw new UserError(HttpStatus.FORBIDDEN, 'Incorrect login or password');
  }
  return true;
};

const getToken = async req => {
  validateLogin(req);
  const user = await userRepo.getUserByLogin(req.body.login);
  if (user) {
    const isPasswordValid = await checkPassword(user, req.body.password);
    if (!isPasswordValid) {
      throw new UserError(HttpStatus.FORBIDDEN, 'Incorrect login or password');
    }
    const payload = { id: user.id, login: user.login };
    return jwt.sign(payload, JWT_SECRET_KEY);
  }
  throw new UserError(HttpStatus.FORBIDDEN, 'Incorrect login or password');
};

const loginCheck = async (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    const tokenSplitted = token.replace('Bearer ', '');
    if (tokenSplitted) {
      jwt.verify(tokenSplitted, JWT_SECRET_KEY, err => {
        if (err) {
          throw new Error(
            HttpStatus.UNAUTHORIZED,
            'Access token is missing or invalid'
          );
        }
        next();
      });
    }
  } else {
    res
      .status(HttpStatus.UNAUTHORIZED, 'Access token is missing or invalid')
      .send();
  }
};
module.exports = { loginCheck, getToken };
