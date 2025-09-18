// backend/models/experiencia.js
const mongoose = require('mongoose');

const experienciaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  contacto: { type: String, required: true },
  fecha: { type: Date, required: true },
  seleccionadas: [{ type: String, required: true }]
});

module.exports = mongoose.model('Experiencia', experienciaSchema);