// src/pages/Learn/games/FinnsJourney/components/GameProgress.js
import React from 'react';
import { StarIcon, TrophyIcon } from '@heroicons/react/24/outline';

const ACHIEVEMENTS = [
  {
    id: 'balanced_budget',
    title: 'Budget Master',
    description: 'Successfully balance your first budget',
    icon: StarIcon,
  },
  {
    id: 'saving_pro',
    title: 'Saving Pro',
    description: 'Save more than 20% of your income',
    icon: TrophyIcon,
  },
  // Add more achievements
];

const GameProgress = ({ score, achievements }) => {
  return (
    <div className="bg-[#242832] rounded-xl p-6 border border-[#2191FB]/10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#ECE5F0]">Progress</h3>
          <p className="text-[#ECE5F0]/70">Level {Math.floor(score / 1000) + 1}</p>
        </div>
        <div className="text-3xl font-bold text-[#2191FB]">{score}</div>
      </div>

      <div className="space-y-4">
        {ACHIEVEMENTS.map((achievement) => (
          <div 
            key={achievement.id}
            className={`flex items-center space-x-4 p-4 rounded-lg border ${
              achievements.includes(achievement.id)
                ? 'border-[#2191FB] bg-[#2191FB]/10'
                : 'border-gray-700 opacity-50'
            }`}
          >
            <achievement.icon className={`w-8 h-8 ${
              achievements.includes(achievement.id) ? 'text-[#2191FB]' : 'text-gray-500'
            }`} />
            <div>
              <h4 className="text-[#ECE5F0] font-medium">{achievement.title}</h4>
              <p className="text-sm text-[#ECE5F0]/70">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameProgress;