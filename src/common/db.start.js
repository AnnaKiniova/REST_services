const mongoose = require('mongoose');
const path = require('path');

const { MONGO_CONNECTION_STRING } = require(path.join(__dirname, './config'));
// mock data to test

const User = require(path.join(__dirname, '../resources/users/user.model'));
const Board = require(path.join(__dirname, '../resources/board/board.model'));
const Task = require(path.join(__dirname, '../resources/task/task.model'));

const users = [
  new User({ name: 'admin', login: 'admin', password: 'admin' }),
  new User({ name: 'user', login: 'log_user', password: 'user' })
];

const boards = [
  new Board({
    id: '1',
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
const tasks = [
  new Task({
    title: 'test task 1',
    order: 1,
    description: 'Lorem ipsum',
    boardId: '1',
    userId: null,
    columnId: null
  }),
  new Task({
    title: 'test task 2',
    order: 2,
    description: 'Lorem ipsum',
    boardId: '1',
    userId: null,
    columnId: null
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
    // await db.dropDatabase();
    // mock data to test

    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    callback();
  });
};

module.exports = { connectDB };
