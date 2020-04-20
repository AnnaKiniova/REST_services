const path = require('path');

const { PORT } = require(path.join(__dirname, './common/config'));
const { connectDB } = require(path.join(__dirname, './common/db.start'));

const app = require(path.join(__dirname, './app'));

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
