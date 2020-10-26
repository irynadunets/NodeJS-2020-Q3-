const uuid = require('uuid');
const mongoose = require('mongoose');
const columnSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);
columnSchema.statics.toResponse = column => {
  const { id, title, order } = column;
  return { id, title, order };
};

// const Column = mongoose.model('Column', columnSchema);

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [columnSchema],
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);
boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
