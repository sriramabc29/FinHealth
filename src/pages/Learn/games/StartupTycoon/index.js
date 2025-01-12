// src/pages/Learn/games/StartupTycoon/index.js
import React, { useState, useEffect } from 'react';
import { BUSINESS_TYPES } from './config/businesses';
import Dashboard from './components/Dashboard';
import BusinessView from './components/BusinessView';
import GameControls from './components/GameControls';

const StartupTycoon = () => {
  const [gameState, setGameState] = useState({
    selectedBusiness: null,
    cash: 10000,
    revenue: 1000,
    employees: [],
    businessLevel: 1,
    reputation: 50,
    monthlyExpenses: 500,
    marketingCampaigns: [],
    activeEffects: [],
    day: 1,
    isGameOver: false
  });

  const [showSetup, setShowSetup] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const calculateRevenue = (employees, level) => {
    const baseRevenue = 1000;
    const employeeRevenue = employees.length * 800;
    const levelMultiplier = 1 + (level - 1) * 0.5;
    const revenueBeforeEffects = (baseRevenue + employeeRevenue) * levelMultiplier;
    const marketingBoost = gameState.activeEffects.some(effect => effect.type === 'marketing') ? 1.2 : 1;
    return Math.floor(revenueBeforeEffects * marketingBoost);
  };

  const startBusiness = (businessType) => {
    const business = BUSINESS_TYPES.find(b => b.id === businessType);
    if (business) {
      setGameState(prev => ({
        ...prev,
        selectedBusiness: business,
        cash: prev.cash - business.initialCost,
        monthlyExpenses: business.monthlyExpenses,
        revenue: 1000,
        employees: Array(business.startingEmployees).fill({
          skill: 'junior',
          salary: 2000,
          productivity: 1.0
        })
      }));
      setShowSetup(false);
    }
  };

  const handleHireEmployee = () => {
    const hireCost = 2000;
    if (gameState.cash >= hireCost) {
      setGameState(prev => {
        const newEmployees = [...prev.employees, {
          skill: 'junior',
          salary: 2000,
          productivity: 1.0
        }];
        return {
          ...prev,
          cash: prev.cash - hireCost,
          monthlyExpenses: prev.monthlyExpenses + 2000,
          employees: newEmployees,
          revenue: calculateRevenue(newEmployees, prev.businessLevel)
        };
      });
    }
  };

  const handleMarketing = () => {
    const cost = 5000;
    if (gameState.cash >= cost) {
      setGameState(prev => ({
        ...prev,
        cash: prev.cash - cost,
        activeEffects: [
          ...prev.activeEffects,
          { type: 'marketing', daysLeft: 30 }
        ]
      }));
    }
  };

  const handleUpgrade = () => {
    const nextLevel = gameState.selectedBusiness.levels[gameState.businessLevel];
    if (nextLevel && gameState.cash >= nextLevel.upgradeCost) {
      setGameState(prev => ({
        ...prev,
        cash: prev.cash - nextLevel.upgradeCost,
        businessLevel: prev.businessLevel + 1
      }));
    }
  };

  useEffect(() => {
    if (!showSetup && !gameState.isGameOver && !isPaused) {
      const gameTimer = setInterval(() => {
        setGameState(prev => {
          const dailyRevenue = Math.floor(prev.revenue / 30);
          const dailyExpenses = Math.floor(prev.monthlyExpenses / 30);
          const newCash = prev.cash + dailyRevenue - dailyExpenses;

          const updatedEffects = prev.activeEffects
            .map(effect => ({...effect, daysLeft: effect.daysLeft - 1}))
            .filter(effect => effect.daysLeft > 0);

          if (newCash < -5000) {
            clearInterval(gameTimer);
            return { ...prev, isGameOver: true };
          }

          return {
            ...prev,
            cash: newCash,
            day: prev.day + 1,
            activeEffects: updatedEffects,
            revenue: calculateRevenue(prev.employees, prev.businessLevel)
          };
        });
      }, 1000);

      return () => clearInterval(gameTimer);
    }
  }, [showSetup, gameState.isGameOver, isPaused]);

  const renderGameOver = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#242832] p-8 rounded-xl border border-[#2191FB]/10 max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#ECE5F0] mb-4">Game Over!</h2>
        <p className="text-[#ECE5F0]/70 mb-6">
          Your business has gone bankrupt after {gameState.day} days.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-[#2191FB] text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#1b1f27] text-[#ECE5F0]">
      {showSetup ? (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Choose Your Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BUSINESS_TYPES.map(business => (
              <div 
                key={business.id}
                className="bg-[#242832] p-6 rounded-xl border border-[#2191FB]/10 
                          hover:border-[#2191FB]/30 cursor-pointer transition-all"
                onClick={() => startBusiness(business.id)}
              >
                <h3 className="text-xl font-bold mb-2">{business.name}</h3>
                <p className="text-[#ECE5F0]/70 mb-4">{business.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Initial Cost:</span>
                    <span className="text-[#2191FB]">£{business.initialCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Expenses:</span>
                    <span className="text-[#2191FB]">£{business.monthlyExpenses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Starting Team:</span>
                    <span className="text-[#2191FB]">{business.startingEmployees} employees</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          <div className="lg:col-span-2">
            <BusinessView 
              businessType={gameState.selectedBusiness.id}
              level={gameState.businessLevel}
              employeeCount={gameState.employees.length}
            />
          </div>
          <div className="space-y-6">
            <Dashboard 
              gameState={gameState}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
            />
            <GameControls 
              gameState={gameState}
              onHire={handleHireEmployee}
              onUpgrade={handleUpgrade}
              onMarketing={handleMarketing}
            />
          </div>
        </div>
      )}
      {gameState.isGameOver && renderGameOver()}
    </div>
  );
};

export default StartupTycoon;