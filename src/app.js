const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Importar rutas
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const uploadRoutes = require('./routes/uploadRoutes');
const clinicalHistoryRoutes = require('./routes/clinicalHistory.routes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/healt-centers', projectRoutes);
app.use('/api/v1/files', uploadRoutes);
app.use('/api/v1/clinical-histories', clinicalHistoryRoutes);

module.exports = app;