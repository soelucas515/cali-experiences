// backend/controllers/experienciaController.js
const Experiencia = require('../models/experiencia');

// Crear experiencia
const crearExperiencia = async (req, res) => {
  try {
    const { nombre, contacto, fecha, seleccionadas } = req.body;

    const nuevaExperiencia = new Experiencia({
      nombre,
      contacto,
      fecha,
      seleccionadas,
    });

    await nuevaExperiencia.save();
    res.status(201).json({ message: '✅ Experiencia guardada con éxito' });
  } catch (error) {
    console.error('❌ Error al guardar experiencia:', error);
    res.status(500).json({ error: 'Error al guardar experiencia' });
  }
};

module.exports = { crearExperiencia };
