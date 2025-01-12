// src/pages/Learn/games/FinnsJourney/index.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GAME_LEVELS } from './config/levels';
import Finn from './components/Finn';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameAchievements from './components/GameAchievements';
import GameProgress from './components/GameProgress';

const FinnsJourney = () => {
  const [gameState, setGameState] = useState({
    level: 1,
    balance: 1000,
    monthlyIncome: 500,
    expenses: {},
    savings: 0,
    investments: {
      stocks: 0,
      bonds: 0,
      savings: 0
    },
    score: 0,
    achievements: [],
    isGameOver: false,
    currentChallenge: null
  });

  const handleNextLevel = () => {
    const nextLevel = gameState.level + 1;
    const levelConfig = GAME_LEVELS[nextLevel - 1];
    
    setGameState(prev => ({
      ...prev,
      level: nextLevel,
      monthlyIncome: levelConfig.monthlyIncome,
      completedCurrentLevel: false
    }));
    
    setFinnMood('idle');
  };

  const [finnMood, setFinnMood] = useState('idle');

  const handleAchievement = (achievementId) => {
    if (!gameState.achievements.includes(achievementId)) {
      setGameState(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementId],
        score: prev.score + 100
      }));
    }
  };

  const handleInvestment = (type, amount) => {
    setGameState(prev => ({
      ...prev,
      investments: {
        ...prev.investments,
        [type]: prev.investments[type] + amount
      },
      balance: prev.balance - amount
    }));

    // Check for investment achievements
    if (Object.values(gameState.investments).reduce((a, b) => a + b, 0) > 1000) {
      handleAchievement('investor_starter');
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <Finn mood={finnMood} />
            <GameProgress 
              score={gameState.score}
              achievements={gameState.achievements}
            />
            <GameAchievements achievements={gameState.achievements} />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <GameBoard 
            gameState={gameState}
            setGameState={setGameState}
            setFinnMood={setFinnMood}
            onAchievement={handleAchievement}
          />
          
          {/* Investment Section */}
          {gameState.level > 1 && (
            <div className="bg-[#242832] rounded-xl p-6 border border-[#2191FB]/10">
              <h3 className="text-xl font-bold text-[#ECE5F0] mb-4">Investment Options</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(gameState.investments).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInvestment(type, 100)}
                    className="p-4 rounded-lg bg-[#2191FB]/10 hover:bg-[#2191FB]/20 
                             text-[#ECE5F0] transition-all"
                    disabled={gameState.balance < 100}
                  >
                    <div className="font-medium capitalize">{type}</div>
                    <div className="text-sm text-[#ECE5F0]/70">
                      £{gameState.investments[type]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <GameControls 
            gameState={gameState}
            onNextLevel={handleNextLevel}
            onStartGame={() => {
              setGameState(prev => ({
                ...prev,
                level: 1,
                balance: 1000,
                isGameOver: false
              }));
              setFinnMood('idle');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinnsJourney;