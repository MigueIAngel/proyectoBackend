// controllers/userController.js
const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: 'User not found', error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating the user', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the user', error });
  }
};

// controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ auth: true, token });
    } else {
      res.status(401).json("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
