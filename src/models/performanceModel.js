// Modelo de Performance do Modelo Smile
class PerformanceModel {
  constructor(employeeId, role, weeklyGoal, actualValue, weekNumber, cycleMonth) {
    this.employeeId = employeeId;
    this.role = role; // 'CRC', 'Dentista', 'Closer', 'Recepcionista'
    this.weeklyGoal = weeklyGoal;
    this.actualValue = actualValue;
    this.weekNumber = weekNumber;
    this.cycleMonth = cycleMonth;
    this.timestamp = new Date();
  }

  // Calcular medalhas baseado em performance
  calculateMedals() {
    const performance = (this.actualValue / this.weeklyGoal) * 100;

    if (performance >= 120) return 3; // Ouro
    if (performance >= 110) return 2; // Prata
    if (performance >= 100) return 1; // Bronze
    return 0; // Sem medalha
  }

  // Definir rótulo da medalha
  getMedalLabel() {
    const medals = this.calculateMedals();
    const labels = { 0: 'Nenhuma', 1: 'Bronze', 2: 'Prata', 3: 'Ouro' };
    return labels[medals];
  }

  // Calcular emblem mensal (Bronze a Master baseado em medalhas acumuladas)
  calculateMonthlyEmblem(totalMedalsMonth) {
    if (totalMedalsMonth >= 20) return 'Master';
    if (totalMedalsMonth >= 15) return 'Elite';
    if (totalMedalsMonth >= 10) return 'Ouro';
    if (totalMedalsMonth >= 5) return 'Prata';
    return 'Bronze';
  }

  // Determinar nível de carreira (Júnior até Treinador)
  getCareerLevel(consecutiveGoldCycles, yearsExperience) {
    if (consecutiveGoldCycles >= 2 && yearsExperience >= 3) return 'Treinador';
    if (consecutiveGoldCycles >= 2 && yearsExperience >= 2) return 'Elite';
    if (consecutiveGoldCycles >= 2) return 'Sênior';
    if (yearsExperience >= 1) return 'Pleno';
    return 'Júnior';
  }
}

module.exports = PerformanceModel;