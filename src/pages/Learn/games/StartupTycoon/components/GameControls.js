// src/pages/Learn/games/StartupTycoon/components/GameControls.js
import React from 'react';
import { UserPlusIcon, ArrowUpCircleIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

const GameControls = ({ gameState, onHire, onUpgrade, onMarketing }) => {
  // Calculate max employees for current level
  const maxEmployees = gameState.businessLevel * 5;
  const canHire = gameState.cash >= 2000 && gameState.employees.length < maxEmployees;
  
  // Calculate upgrade cost based on current level
  const upgradeCost = gameState.businessLevel * 10000;
  const canUpgrade = gameState.cash >= upgradeCost;
  
  // Marketing campaign cost and availability
  const marketingCost = 5000;
  const canMarketing = gameState.cash >= marketingCost;
  
  return (
    <div className="space-y-4">
      {/* Hire Employee Button */}
      <button
        onClick={onHire}
        disabled={!canHire}
        className={`w-full p-4 rounded-lg flex items-center justify-between
                   ${canHire 
                     ? 'bg-[#2191FB] text-white hover:bg-[#2191FB]/90' 
                     : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
      >
        <div className="flex items-center space-x-3">
          <UserPlusIcon className="w-5 h-5" />
          <div className="flex flex-col items-start">
            <span>Hire Employee</span>
            <span className="text-xs opacity-70">
              {gameState.employees.length}/{maxEmployees} Employees
            </span>
          </div>
        </div>
        <span>£2,000</span>
      </button>

      {/* Upgrade Business Button */}
      <button
        onClick={onUpgrade}
        disabled={!canUpgrade}
        className={`w-full p-4 rounded-lg flex items-center justify-between
                   ${canUpgrade
                     ? 'bg-[#2191FB]/10 text-[#2191FB] hover:bg-[#2191FB]/20 border border-[#2191FB]' 
                     : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
      >
        <div className="flex items-center space-x-3">
          <ArrowUpCircleIcon className="w-5 h-5" />
          <div className="flex flex-col items-start">
            <span>Upgrade Business</span>
            <span className="text-xs opacity-70">
              Level {gameState.businessLevel} → {gameState.businessLevel + 1}
            </span>
          </div>
        </div>
        <span>£{upgradeCost.toLocaleString()}</span>
      </button>

      {/* Marketing Campaign Button */}
      <button
        onClick={onMarketing}
        disabled={!canMarketing}
        className={`w-full p-4 rounded-lg flex items-center justify-between
                   ${canMarketing
                     ? 'bg-[#2191FB]/10 text-[#2191FB] hover:bg-[#2191FB]/20 border border-[#2191FB]' 
                     : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
      >
        <div className="flex items-center space-x-3">
          <MegaphoneIcon className="w-5 h-5" />
          <div className="flex flex-col items-start">
            <span>Marketing Campaign</span>
            <span className="text-xs opacity-70">
              Boost revenue by 20% for 30 days
            </span>
          </div>
        </div>
        <span>£{marketingCost.toLocaleString()}</span>
      </button>

      {/* Game Progress Info */}
      <div className="mt-4 p-4 bg-[#242832] rounded-lg border border-[#2191FB]/10">
        <h3 className="text-[#ECE5F0] font-medium mb-2">Business Progress</h3>
        <div className="space-y-2 text-sm text-[#ECE5F0]/70">
          <div className="flex justify-between">
            <span>Monthly Revenue</span>
            <span>£{gameState.revenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly Expenses</span>
            <span>£{gameState.monthlyExpenses.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-medium text-[#ECE5F0]">
            <span>Net Profit</span>
            <span>£{(gameState.revenue - gameState.monthlyExpenses).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;