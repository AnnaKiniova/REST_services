const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const fs = require('fs');

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
    console.log('in app check');
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
  // eslint-disable-next-line no-sync
  fs.writeFileSync(path.join(__dirname, '.fatal.log'), JSON.stringify(e));
  console.log('uncaught error');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', () => {
  console.error('Unhandled rejection detected');
});

// code is left for you to improve testing and evaluation. Please use it for saving time.

// setInterval(() => {
//   console.log('working');
// }, 1000);

// setInterval(() => {
//   Promise.reject(Error('Oops!'));
// }, 2500);

// setInterval(() => {
//   throw Error('Oops!');
// }, 5000);

module.exports = app;
