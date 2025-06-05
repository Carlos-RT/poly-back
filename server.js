require('dotenv').config(); // ⬅️ Esto debe ir antes de usar process.env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar con MongoDB usando la variable del .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión a MongoDB', err));

// 🎯 Esquema de la compra
const compraSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  direccion: String,
  carrito: Object,
  fecha: { type: Date, default: Date.now }
});

const Compra = mongoose.model('Compra', compraSchema);

// 🚀 Ruta POST para guardar compra
app.post('/api/compra', async (req, res) => {
  try {
    const nuevaCompra = new Compra(req.body);
    await nuevaCompra.save();
    res.status(201).send({ message: 'Compra guardada con éxito.' });
  } catch (error) {
    res.status(500).send({ error: 'Error al guardar la compra.' });
  }
});

// 🌐 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
