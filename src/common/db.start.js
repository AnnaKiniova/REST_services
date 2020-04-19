const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');

const connectDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    console.log('db is connected');
    callback();
  });
};

module.exports = { connectDB };
