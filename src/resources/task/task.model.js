const uuid = require('uuid');
const mongoose = require('mongoose');

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'title',
//     order = 1,
//     description = 'description',
//     userId = null,
//     boardId = null,
//     columnId = null
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: { type: String, default: uuid }
  },
  { versionKey: false }
);

// taskSchema.statics.toResponse = user => {
//   const { id, name, login } = user;
//   return { id, name, login };
// };

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
