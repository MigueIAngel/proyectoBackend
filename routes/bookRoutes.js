// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, bookController.createBook);
router.put('/:id', verifyToken, bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);
router.get('/:id', bookController.getBookById);
router.get('/', bookController.getAllBooks);
module.exports = router;
