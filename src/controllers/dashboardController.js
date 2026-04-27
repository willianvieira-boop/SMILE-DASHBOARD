const PerformanceModel = require('../models/performanceModel');
const admin = require('../config/firebase');

// Simular banco de dados em memória (substituir por Firebase depois)
let performanceData = [];

// Adicionar registro de performance
exports.addPerformance = async (req, res) => {
  try {
    const { employeeId, role, weeklyGoal, actualValue, weekNumber, cycleMonth } = req.body;

    if (!employeeId || !role || weeklyGoal === undefined || actualValue === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const performance = new PerformanceModel(
      employeeId,
      role,
      weeklyGoal,
      actualValue,
      weekNumber,
      cycleMonth
    );

    performanceData.push(performance);

    return res.status(201).json({
      message: 'Performance registrada com sucesso',
      data: {
        employeeId,
        role,
        medals: performance.calculateMedals(),
        medalLabel: performance.getMedalLabel(),
        performance: `${((actualValue / weeklyGoal) * 100).toFixed(2)}%`
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao registrar performance', details: error.message });
  }
};

// Obter performance de um funcionário
exports.getEmployeePerformance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employeePerformance = performanceData.filter(p => p.employeeId === employeeId);

    if (employeePerformance.length === 0) {
      return res.status(404).json({ error: 'Nenhum registro de performance encontrado' });
    }

    return res.status(200).json({
      employeeId,
      totalRecords: employeePerformance.length,
      data: employeePerformance
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar performance', details: error.message });
  }
};

// Obter performance de toda clínica
exports.getClinicPerformance = async (req, res) => {
  try {
    const summary = {
      totalEmployees: new Set(performanceData.map(p => p.employeeId)).size,
      totalRecords: performanceData.length,
      byRole: {},
      averagePerformance: 0
    };

    // Agrupar por role
    performanceData.forEach(p => {
      if (!summary.byRole[p.role]) {
        summary.byRole[p.role] = {
          count: 0,
          totalMedals: 0,
          averagePerformance: 0
        };
      }
      summary.byRole[p.role].count += 1;
      summary.byRole[p.role].totalMedals += p.calculateMedals();
      summary.byRole[p.role].averagePerformance += (p.actualValue / p.weeklyGoal) * 100;
    });

    // Calcular médias
    Object.keys(summary.byRole).forEach(role => {
      summary.byRole[role].averagePerformance = (
        summary.byRole[role].averagePerformance / summary.byRole[role].count
      ).toFixed(2) + '%';
    });

    return res.status(200).json(summary);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar performance da clínica', details: error.message });
  }
};

// Obter métricas do Modelo Smile
exports.getModeloSmileMetrics = async (req, res) => {
  try {
    const metrics = {
      crcMetrics: {
        weeklyGoal: '25 pacientes',
        currentMonth: {
          week1: { value: 28, medals: 3, label: 'Ouro' },
          week2: { value: 24, medals: 0, label: 'Nenhuma' },
          week3: { value: 26, medals: 3, label: 'Ouro' },
          week4: { value: 30, medals: 3, label: 'Ouro' }
        },
        monthlyEmblem: 'Ouro',
        careerLevel: 'Sênior'
      },
      dentistMetrics: {
        weeklyGoal: 'R$ 9.000',
        currentMonth: {
          week1: { value: 10500, medals: 3, label: 'Ouro' },
          week2: { value: 8500, medals: 0, label: 'Nenhuma' },
          week3: { value: 9200, medals: 1, label: 'Bronze' },
          week4: { value: 11000, medals: 3, label: 'Ouro' }
        },
        monthlyEmblem: 'Ouro',
        careerLevel: 'Elite'
      },
      closerMetrics: {
        weeklyGoal: 'R$ 15.000',
        currentMonth: {
          week1: { value: 18000, medals: 3, label: 'Ouro' },
          week2: { value: 14000, medals: 0, label: 'Nenhuma' },
          week3: { value: 16500, medals: 3, label: 'Ouro' },
          week4: { value: 17000, medals: 3, label: 'Ouro' }
        },
        monthlyEmblem: 'Ouro',
        careerLevel: 'Treinador'
      }
    };

    return res.status(200).json(metrics);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar métricas do Modelo Smile', details: error.message });
  }
};