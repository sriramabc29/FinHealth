// src/pages/Learn/games/FinnsJourney/components/GameBoard.js
import React, { useState, useEffect } from 'react';
import { GAME_LEVELS } from '../config/levels';


const CATEGORIES = [
  { id: 'housing', name: 'Housing', min: 200, max: 400, recommended: 300 },
  { id: 'food', name: 'Food', min: 100, max: 300, recommended: 200 },
  { id: 'savings', name: 'Savings', min: 50, max: 200, recommended: 100 },
  { id: 'entertainment', name: 'Entertainment', min: 0, max: 100, recommended: 50 }
];

const FINANCIAL_WISDOM = [
  "\"Becoming rich is nothing more than a matter of committing and sticking to a systematic savings and investment plan.\" - The Millionaire Next Door",
  "\"If you would be wealthy, think of saving as well as getting.\" - Benjamin Franklin",
  "\"Do not save what is left after spending; instead spend what is left after saving.\" - Warren Buffett",
  "\"Live below your means but within your needs.\" - The Millionaire Next Door",
  "\"Wealth is not about having a lot of money; it's about having a lot of options.\" - Chris Rock"
];

const GameBoard = ({ gameState, setGameState, setFinnMood, onAchievement }) => {
  const [allocation, setAllocation] = useState({});
  const [feedback, setFeedback] = useState('');
  const [wisdomQuote, setWisdomQuote] = useState('');

  const checkLevelCompletion = (total, newAllocation) => {
    if (total === gameState.monthlyIncome) {
      const currentLevel = GAME_LEVELS[gameState.level - 1];
      setFinnMood('happy');
      const randomQuote = FINANCIAL_WISDOM[Math.floor(Math.random() * FINANCIAL_WISDOM.length)];
      setFeedback('Level Complete! ' + currentLevel.unlockMessage);
      setWisdomQuote(randomQuote);
      
      // Check for achievements
      const savingsAmount = newAllocation.savings || 0;
      const savingsPercentage = (savingsAmount / gameState.monthlyIncome) * 100;
      
      if (savingsPercentage >= 20 && onAchievement) {
        onAchievement('savings_master');
      }
  
      // Mark level as complete
      setGameState(prev => ({
        ...prev,
        completedCurrentLevel: true,
        score: prev.score + 500
      }));
    }
  };

  const handleAllocation = (category, value) => {
    const newAllocation = {
       ...allocation,
       [category.id]: parseInt(value)
     };
     setAllocation(newAllocation);
   
     const total = Object.values(newAllocation).reduce((sum, val) => sum + (val || 0), 0);
     if (total > gameState.monthlyIncome) {
       setFinnMood('sad');
       setFeedback('Oops! We are over budget!');
       setWisdomQuote('');
     } else if (total === gameState.monthlyIncome) {
       checkLevelCompletion(total, newAllocation);
     } else {
       setFinnMood('thinking');
       setFeedback(`£${gameState.monthlyIncome - total} left to allocate`);
       setWisdomQuote('');
     }
   };

   const getProgressColor = (value, category) => {
    if (!value) return 'bg-gray-200';
    const percentage = (value / category.recommended) * 100;
    if (percentage > 120) return 'bg-red-500';
    if (percentage > 100) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressWidth = (value, category) => {
    if (!value) return '0%';
    const percentage = (value / category.max) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  return (
    <div className="bg-[#242832] rounded-xl p-6 border border-[#2191FB]/10">
      <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold text-[#ECE5F0]">
            Level {gameState.level}: {GAME_LEVELS[gameState.level - 1].title}
          </h4>
          <span className="text-[#2191FB] text-sm">
            {GAME_LEVELS[gameState.level - 1].goal}
          </span>
        </div>
        <h4 className="text-xl font-bold text-[#ECE5F0] mb-2">
          Monthly Budget Challenge
        </h4>
        <p className="text-[#ECE5F0]/70 mb-4">
          Help allocate the monthly budget of £{gameState.monthlyIncome}
        </p>
        <div className="text-sm text-[#2191FB] mb-2">{feedback}</div>
        {wisdomQuote && (
          <div className="text-sm text-[#ECE5F0]/70 italic border-l-2 border-[#2191FB]/30 pl-4 mt-4">
            {wisdomQuote}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-2">
            <div className="flex justify-between text-[#ECE5F0]/70 text-sm">
              <span>{category.name}</span>
              <span>£{allocation[category.id] || 0}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={category.min}
                max={category.max}
                value={allocation[category.id] || category.min}
                onChange={(e) => handleAllocation(category, e.target.value)}
                className="w-full appearance-none bg-[#1b1f27] h-2 rounded-full"
              />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full ${getProgressColor(allocation[category.id], category)}`}
                style={{ width: getProgressWidth(allocation[category.id], category) }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#ECE5F0]/50">
              <span>Min: £{category.min}</span>
              <span>Recommended: £{category.recommended}</span>
              <span>Max: £{category.max}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#2191FB]/10">
        <div className="flex justify-between text-[#ECE5F0]">
          <span>Total Allocated:</span>
          <span>£{Object.values(allocation).reduce((sum, val) => sum + (val || 0), 0)}</span>
        </div>
        <div className="flex justify-between mt-2 text-[#ECE5F0]/70">
          <span>Monthly Income:</span>
          <span>£{gameState.monthlyIncome}</span>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;