const { PORT } = require('./common/config');
const app = require('./app');
const fs = require('fs');
const path = require('path');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

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

// setInterval(() => {
//   console.log('working');
// }, 1000);
// setInterval(() => {
//   Promise.reject(Error('Oops!'));
// }, 2500);
