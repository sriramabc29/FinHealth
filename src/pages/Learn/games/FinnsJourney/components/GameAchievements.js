// src/pages/Learn/games/FinnsJourney/components/GameAchievements.js
import React from 'react';
import { StarIcon, TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline';

const ACHIEVEMENT_LIST = [
  {
    id: 'savings_master',
    title: 'Savings Master',
    description: 'Save 20% or more of monthly income',
    icon: StarIcon,
    points: 100
  },
  {
    id: 'budget_wizard',
    title: 'Budget Wizard',
    description: 'Complete a budget within recommended ranges',
    icon: SparklesIcon,
    points: 150
  },
  {
    id: 'investor_starter',
    title: 'Beginning Investor',
    description: 'Make your first investment',
    icon: TrophyIcon,
    points: 200
  }
];

const GameAchievements = ({ achievements }) => {
  return (
    <div className="bg-[#242832] rounded-xl p-6 border border-[#2191FB]/10">
      <h3 className="text-xl font-bold text-[#ECE5F0] mb-4">Achievements</h3>
      <div className="space-y-4">
        {ACHIEVEMENT_LIST.map((achievement) => {
          const isUnlocked = achievements.includes(achievement.id);
          
          return (
            <div 
              key={achievement.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                isUnlocked 
                  ? 'bg-[#2191FB]/10 border border-[#2191FB]' 
                  : 'bg-[#1b1f27]/50 border border-gray-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-[#2191FB]/20' : 'bg-gray-800'}`}>
                <achievement.icon 
                  className={`w-6 h-6 ${isUnlocked ? 'text-[#2191FB]' : 'text-gray-500'}`} 
                />
              </div>
              
              <div>
                <h4 className={`font-medium ${isUnlocked ? 'text-[#ECE5F0]' : 'text-[#ECE5F0]/50'}`}>
                  {achievement.title}
                </h4>
                <p className="text-sm text-[#ECE5F0]/70">{achievement.description}</p>
                <span className="text-xs text-[#2191FB]">+{achievement.points} points</span>
              </div>
              
              {isUnlocked && (
                <div className="ml-auto">
                  <SparklesIcon className="w-5 h-5 text-[#2191FB]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameAchievements;