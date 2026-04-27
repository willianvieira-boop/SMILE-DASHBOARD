const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken } = require('../middleware/auth');

// ROTAS DE PERFORMANCE
// POST - Adicionar novo registro de performance
router.post('/performance', dashboardController.addPerformance);

// GET - Performance de um funcionário
router.get('/performance/:employeeId', dashboardController.getEmployeePerformance);

// GET - Performance de toda clínica
router.get('/clinic/performance', dashboardController.getClinicPerformance);

// ROTAS DO MODELO SMILE
// GET - Métricas do Modelo Smile
router.get('/modelo-smile/metrics', dashboardController.getModeloSmileMetrics);

module.exports = router;