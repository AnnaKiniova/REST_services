const uuid = require('uuid');
const mongoose = require('mongoose');

// class Board {
//   constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }

const boardSchema = new mongoose.Schema({
  title: String,
  columns: Array,
  _id: uuid
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
