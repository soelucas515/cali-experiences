// backend/server.js
const express = require('express');
const cors = require('cors');
const experienciaRoutes = require('./routes/experienciaRoutes');
require('dotenv').config();
require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/experiencia', experienciaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Servidor activo en: http://localhost:${PORT}`));

