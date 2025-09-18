// backend/routes/experienciaRoutes.js
const express = require('express');
const router = express.Router();
const { crearExperiencia } = require('../controllers/experienciaController');

// Solo POST
router.post('/', crearExperiencia);

module.exports = router;
