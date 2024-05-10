// controllers/bookController.js
const Book = require('../models/book');

exports.createBook = async (req, res) => {
  try {
    // Añadir ID de usuario autenticado como autor del libro
    const userId = req.user.id;
    const bookData = {
      ...req.body,
      author: userId
    };

    // Verificar si ya existe un libro con los mismos valores en todos los campos (excepto el id)
    const existingBook = await Book.findOne(bookData);
    if (existingBook) {
      return res.status(409).json({ message: 'A book with the same values already exists' });
    }

    const newBook = await Book.create(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error });
  }
};

// controllers/bookController.js
exports.getAllBooks = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Filtrado avanzado: agregar regex para permitir búsqueda parcial en campos de texto
    if (queryObj.title) {
      queryObj.title = { $regex: queryObj.title, $options: "i" };
    }
    if (queryObj.author) {
      queryObj.author = queryObj.author;  // Asegúrate de que el autor es pasado como ID válido de MongoDB
    }
    if (queryObj.publisher) {
      queryObj.publisher = { $regex: queryObj.publisher, $options: "i" };
    }

    const books = await Book.find(queryObj);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error getting the books', error });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: 'Book not found', error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const userId = req.user.id; // Asegúrate de que el middleware auth coloca el user en req.user
    const book = await Book.findById(req.params.id);
    
    // Verificar si el usuario autenticado es el autor del libro
    if (book.author !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this book' });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error updating the book', error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the book', error });
  }
};
