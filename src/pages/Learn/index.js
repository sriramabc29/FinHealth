// src/pages/Learn/index.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  BookOpenIcon, 
  AcademicCapIcon, 
  PlayIcon,
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline';
import FinnsJourney from './games/FinnsJourney';
import StartupTycoon from './games/StartupTycoon';

const GAMES = [
  {
    id: 'finns-journey',
    title: "Finn's Financial Journey",
    description: "Join Finn the Fox on a journey to learn budgeting, saving, and smart investing!",
    icon: AcademicCapIcon,
    level: 'Beginner',
    duration: '15-20 mins',
    skills: ['Budgeting', 'Saving', 'Investing']
  },
  {
    id: 'startup-tycoon',
    title: "Startup Tycoon",
    description: "Build and grow your own business empire while learning financial management!",
    icon: BuildingOfficeIcon,
    level: 'Intermediate',
    duration: '20-30 mins',
    skills: ['Business Finance', 'Investment', 'Growth Strategy']
  }
];

const Learn = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);

  const renderSelectedGame = () => {
    switch(selectedGame) {
      case 'finns-journey':
        return <FinnsJourney />;
      case 'startup-tycoon':
        return <StartupTycoon />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1f27]">
      {/* Header */}
      <nav className="bg-[#1b1f27] border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-[#2191FB]/10 rounded-lg transition-all"
            >
              <ArrowLeftIcon className="w-6 h-6 text-[#2191FB]" />
            </motion.button>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#ECE5F0]"
            >
              Learn Finance
            </motion.h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {!selectedGame ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <BookOpenIcon className="w-6 h-6 text-[#2191FB]" />
                <h2 className="text-2xl font-bold text-[#ECE5F0]">Financial Games</h2>
              </div>
              <div className="text-[#ECE5F0]/70 text-sm">
                Your Progress: 0/2 Games Completed
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GAMES.map((game) => (
                <motion.div
                  key={game.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#242832] rounded-2xl p-6 border border-[#2191FB]/10 hover:border-[#2191FB]/30"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#2191FB]/10 rounded-xl">
                      <game.icon className="w-8 h-8 text-[#2191FB]" />
                    </div>
                    <span className="text-[#ECE5F0]/50 text-sm">{game.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#ECE5F0] mb-2">{game.title}</h3>
                  <p className="text-[#ECE5F0]/70 mb-4">{game.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#2191FB]/10 rounded-full text-[#2191FB] text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#ECE5F0]/50 text-sm">{game.level}</span>
                    <button
                      onClick={() => setSelectedGame(game.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#2191FB] text-white rounded-lg hover:bg-[#2191FB]/90 transition-all"
                    >
                      <PlayIcon className="w-5 h-5" />
                      <span>Play Game</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <button
              onClick={() => setSelectedGame(null)}
              className="flex items-center space-x-2 text-[#2191FB] hover:text-[#2191FB]/80 mb-6"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Games</span>
            </button>

            <div className="bg-[#242832] rounded-2xl p-6 shadow-lg border border-[#2191FB]/10">
              {renderSelectedGame()}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Learn;