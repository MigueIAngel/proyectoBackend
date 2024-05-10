// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request to create a new user
router.post('/', userController.createUser);

// GET request to retrieve a user by ID
router.get('/:id', userController.getUserById);

// PUT request to update a user
router.put('/:id', userController.updateUser);

// DELETE request to delete a user
router.delete('/:id', userController.deleteUser);

// POST request to login a user
router.post('/login', userController.loginUser);
module.exports = router;
