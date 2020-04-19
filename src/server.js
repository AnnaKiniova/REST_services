const { PORT } = require('./common/config');
// const { MONGO_CONNECTION_STRING } = require('./common/config');
// const mongoose = require('mongoose');
const { connectDB } = require('./common/db.start');

const app = require('./app');

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
