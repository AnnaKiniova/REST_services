const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const HttpStatus = require('http-status-codes');
const { loginCheck, getToken } = require(path.join(
  __dirname,
  './utils/jwsAuth'
));

const userRouter = require(path.join(
  __dirname,
  './resources/users/user.router'
));
const boardRouter = require(path.join(
  __dirname,
  './resources/board/board.router'
));
const taskRouter = require(path.join(
  __dirname,
  './resources/task/task.router'
));
const logger = require(path.join(__dirname, './logger'));

const { handleError } = require(path.join(__dirname, './errorHandler'));
const { UserError } = require(path.join(__dirname, './errorHandler'));

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('*', logger.processRequests);

app.use('/users', loginCheck, userRouter);
app.use('/boards', loginCheck, boardRouter);
app.use('/boards/:boardId/tasks', loginCheck, taskRouter);

app.use('/login', getToken);

app.use((err, req, res, next) => {
  if (err instanceof UserError) {
    handleError(err, req, res);
    logger.processError(err);
    return;
  }
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.processError(err);
  res
    .sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    .json(err.message)
    .end();
});

process.on('uncaughtException', e => {
  logger.processUncaughtError(`Unhandled Exception : ${e}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', e => {
  logger.processUncaughtError(`Unhandled Rejection : ${e}`);
});

// code is left to save time while checking task

// setInterval(() => {
//   console.log('working');
// }, 500);

// setInterval(() => {
//   Promise.reject(Error('Oops!'));
//   console.log('promise reject');
// }, 2000);

// setInterval(() => {
//   throw Error('Oops!');
// }, 10000);

module.exports = app;
