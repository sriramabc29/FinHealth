// src/pages/Learn/games/StartupTycoon/config/businesses.js
export const BUSINESS_TYPES = [
    {
      id: 'tech',
      name: 'Tech Startup',
      description: 'Build a cutting-edge software company',
      initialCost: 5000,
      monthlyExpenses: 500,
      startingEmployees: 2,
      levels: [
        {
          name: 'Small Office',
          maxEmployees: 5,
          upgradeCost: 0
        },
        {
          name: 'Tech Hub',
          maxEmployees: 10,
          upgradeCost: 10000
        },
        {
          name: 'Innovation Center',
          maxEmployees: 20,
          upgradeCost: 25000
        }
      ]
    },
    {
      id: 'cafe',
      name: 'Artisan Café',
      description: 'Serve premium coffee and pastries',
      initialCost: 3000,
      monthlyExpenses: 1500,
      startingEmployees: 3,
      revenuePerEmployee: 1000,
      levels: [
        {
          level: 1,
          name: 'Small Café',
          upgradeCost: 0,
          revenueMultiplier: 1,
          maxEmployees: 6
        },
        {
          level: 2,
          name: 'Coffee House',
          upgradeCost: 8000,
          revenueMultiplier: 1.4,
          maxEmployees: 12
        },
        {
          level: 3,
          name: 'Café Chain',
          upgradeCost: 20000,
          revenueMultiplier: 2,
          maxEmployees: 24
        }
      ]
    }
  ];