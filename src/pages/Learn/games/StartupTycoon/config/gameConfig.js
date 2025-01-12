// src/pages/Learn/games/StartupTycoon/config/gameConfig.js
export const GAME_MECHANICS = {
    timeSpeed: 1000, // 1 second = 1 game day
    salaryPerEmployee: 2000,
    revenuePerEmployee: 1000,
    hiringCost: 2000,
    marketingBoost: 0.2, // 20% revenue boost
    marketingDuration: 30 // days
  };
  
  export const BUSINESS_TYPES = {
    tech: {
      name: 'Tech Startup',
      initialCost: 5000,
      levels: [
        {
          name: 'Small Office',
          maxEmployees: 5,
          upgradeCost: 0,
          revenueMultiplier: 1
        },
        {
          name: 'Tech Hub',
          maxEmployees: 10,
          upgradeCost: 10000,
          revenueMultiplier: 1.5,
          requiresEmployees: 5
        },
        {
          name: 'Innovation Center',
          maxEmployees: 20,
          upgradeCost: 25000,
          revenueMultiplier: 2,
          requiresEmployees: 8
        }
      ]
    }
    // Add more business types
  };
  
  export const EVENTS = [
    {
      id: 'client_project',
      title: 'Client Project Opportunity',
      description: 'A potential client offers a project worth £5,000',
      choices: [
        {
          text: 'Accept Project',
          outcome: {
            cash: 5000,
            reputation: 10,
            employees: { productivity: -0.1, duration: 7 }
          }
        },
        {
          text: 'Decline Project',
          outcome: {
            reputation: -5
          }
        }
      ]
    }
    // Add more events
  ];