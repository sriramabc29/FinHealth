// src/pages/Learn/games/StartupTycoon/utils/GameEngine.js
export const calculateRevenue = (business, employees, level) => {
    const currentLevel = business.levels[level - 1];
    const baseRevenue = employees.length * business.revenuePerEmployee;
    return Math.floor(baseRevenue * currentLevel.revenueMultiplier);
  };
  
  export const calculateExpenses = (business, employees) => {
    return business.monthlyExpenses + (employees.length * 2000); // Each employee costs £2000
  };
  
  export const canUpgrade = (business, level, cash) => {
    const nextLevel = business.levels[level];
    return nextLevel && cash >= nextLevel.upgradeCost;
  };
  
  export const canHire = (business, level, employees, cash) => {
    const currentLevel = business.levels[level - 1];
    return employees.length < currentLevel.maxEmployees && cash >= 2000;
  };