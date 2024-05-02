// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// POST request to create a new book
router.post('/', bookController.createBook);

// GET request to retrieve books
router.get('/', bookController.getAllBooks);

// GET request to retrieve a single book by ID
router.get('/:id', bookController.getBookById);

// PUT request to update a book
router.put('/:id', bookController.updateBook);

// DELETE request to delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
