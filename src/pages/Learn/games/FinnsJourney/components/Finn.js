// src/pages/Learn/games/FinnsJourney/components/Finn.js
import React from 'react';

const Finn = ({ mood = 'idle' }) => {
  const getMoodStyles = () => {
    switch (mood) {
      case 'happy':
        return { body: 'text-[#2191FB]', transform: 'scale(1.05)' };
      case 'sad':
        return { body: 'text-[#2191FB]/70', transform: 'scale(0.95)' };
      case 'thinking':
        return { body: 'text-[#2191FB]', transform: 'rotate(-5deg)' };
      default:
        return { body: 'text-[#2191FB]', transform: 'scale(1)' };
    }
  };

  const moodStyles = getMoodStyles();

  return (
    <div className="relative">
       <div className="w-64 h-64 flex items-center justify-center">
    <div 
      className={`p-8 bg-[#2191FB]/20 rounded-full transition-all duration-300 hover:bg-[#2191FB]/30`}
      style={{ transform: moodStyles.transform }}
    >
      {/* Updated Fox SVG with better visibility */}
      <svg viewBox="0 0 100 100" className={`w-40 h-40 ${moodStyles.body}`}>
        <circle cx="50" cy="50" r="40" className="fill-current" />
        <circle cx="35" cy="40" r="6" fill="white" />
        <circle cx="65" cy="40" r="6" fill="white" />
        <circle cx="35" cy="40" r="3" fill="#242832" />
        <circle cx="65" cy="40" r="3" fill="#242832" />
        <path 
          d={mood === 'happy' ? "M40,60 Q50,65 60,60" : "M40,65 Q50,60 60,65"} 
          stroke="white" 
          strokeWidth="3" 
          fill="none" 
        />
      </svg>
    </div>
  </div>
      
      {/* Speech Bubble */}
      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
        <div className="bg-[#242832] rounded-lg p-4 shadow-lg max-w-xs border border-[#2191FB]/10">
          <p className="text-sm text-[#ECE5F0]">
            {getMoodMessage(mood)}
          </p>
        </div>
      </div>
    </div>
  );
};

const getMoodMessage = (mood) => {
  const messages = {
    idle: "Hi! I'm Finn. Let's manage your money wisely!",
    happy: "Great choice! You're making smart financial decisions!",
    sad: "That might be a bit over budget. Let's try again!",
    thinking: "Hmm... Let's think about this carefully."
  };
  return messages[mood];
};

export default Finn;