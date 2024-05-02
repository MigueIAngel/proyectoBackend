// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publicationDate: Date,
  publisher: String
});

module.exports = mongoose.model('Book', bookSchema);
