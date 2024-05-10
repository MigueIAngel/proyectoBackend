// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a User
    ref: 'User',
    required: true
  },
  genre: String,
  publicationDate: Date,
  publisher: String,
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', bookSchema);
