// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/e-commerce-books', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Usar rutas
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
