const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/board/board.router');
const taskRouter = require('./resources/task/task.router');
const logger = require('./logger');

const { handleError } = require('./errorHandler');
const { UserError } = require('./errorHandler');

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

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  if (err instanceof UserError) {
    handleError(err, req, res);
    logger.processError(err);
    return;
  }
  next(err);
});

app.use((err, req, res) => {
  logger.processError(err);
  res
    .status(500)
    .send(err.message)
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
