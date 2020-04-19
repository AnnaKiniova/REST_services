// eslint-disable-next-line node/no-unpublished-require
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    // new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.json()
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.json()
    })
  ]
});

const processRequests = (req, res, next) => {
  const { url, params, body } = req;
  logger.log({
    level: 'info',
    date: new Date(),
    url,
    params,
    body
  });
  next();
};

const processError = async message => {
  const { statusCode, description } = message;
  await logger.log({
    level: 'error',
    date: new Date(),
    statusCode,
    description
  });
};

const processUncaughtError = async message => {
  await logger.log({
    level: 'error',
    date: new Date(),
    message
  });
};

module.exports = { processRequests, processError, processUncaughtError };
