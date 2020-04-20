const mongoose = require('mongoose');
const path = require('path');

const { MONGO_CONNECTION_STRING } = require(path.join(__dirname, './config'));
const User = require(path.join(__dirname, '../resources/users/user.model'));
const Board = require(path.join(__dirname, '../resources/board/board.model'));

const users = [
  new User({ name: 'user1', login: 'login1', password: 'password1' }),
  new User({ name: 'user2', login: 'login2', password: 'password2' })
];

const boards = [
  new Board({
    title: 'board1',
    columns: [
      {
        title: 'test 11',
        order: 1
      },
      {
        title: 'test 12',
        order: 2
      }
    ]
  }),
  new Board({
    title: 'board2',
    columns: [
      {
        title: 'test 21',
        order: 1
      },
      {
        title: 'test 22',
        order: 2
      }
    ]
  })
];

const connectDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', async () => {
    console.log('db is connected');
    await db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    callback();
  });
};

module.exports = { connectDB };
