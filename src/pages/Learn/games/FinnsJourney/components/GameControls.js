// src/pages/Learn/games/FinnsJourney/components/GameControls.js
import React from 'react';
import { GAME_LEVELS } from '../config/levels';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const GameControls = ({ gameState, onNextLevel, onStartGame }) => {
  const isLastLevel = gameState.level === GAME_LEVELS.length;
  const isLevelComplete = gameState.completedCurrentLevel;

  return (
    <div className="mt-8 flex justify-center space-x-4">
      {isLevelComplete && !isLastLevel && (
        <button
          onClick={onNextLevel}
          className="bg-[#2191FB] text-[#ECE5F0] px-6 py-3 rounded-lg font-medium 
                   hover:bg-[#2191FB]/90 transition-all flex items-center space-x-2"
        >
          <span>Next Level</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      )}

      {isLevelComplete && isLastLevel && (
        <div className="text-center">
          <div className="text-2xl font-bold text-[#2191FB] mb-2">
            🎉 Congratulations! 🎉
          </div>
          <p className="text-[#ECE5F0]/70">
            You've completed all levels and mastered the basics of financial planning!
          </p>
          <button
            onClick={onStartGame}
            className="mt-4 border border-[#2191FB] text-[#2191FB] px-6 py-3 rounded-lg 
                     font-medium hover:bg-[#2191FB]/10 transition-all"
          >
            Play Again
          </button>
        </div>
      )}

      {!isLevelComplete && (
        <div className="text-sm text-[#ECE5F0]/70">
          Complete the budget allocation to proceed to the next level
        </div>
      )}
    </div>
  );
};

export default GameControls;