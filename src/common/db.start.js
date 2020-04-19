const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');
// const users = require('../resources/users/users.json');
const User = require('../resources/users/user.model');

const users = [
  new User({ name: 'user1', login: 'login1', password: 'password1' }),
  new User({ name: 'user2', login: 'login2', password: 'password2' })
];

const connectDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    console.log('db is connected');
    users.forEach(user => user.save());
    callback();
  });
};

module.exports = { connectDB };
