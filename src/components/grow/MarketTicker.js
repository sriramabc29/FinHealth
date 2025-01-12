// src/components/grow/MarketTicker.js
import React from 'react';
import { motion } from 'framer-motion';

const MarketTicker = () => {
  const indices = [
    { name: 'S&P 500', value: '4,783.45', change: '+0.32', inGBP: '£3,765.23' },
    { name: 'FTSE 100', value: '7,694.73', change: '-0.12', inGBP: '£7,694.73' },
    { name: 'Nikkei 225', value: '33,464.17', change: '+0.91', inGBP: '£181.45' },
    { name: 'DAX', value: '16,742.07', change: '+0.33', inGBP: '£14,423.82' },
    { name: 'SENSEX', value: '71,483.75', change: '+0.47', inGBP: '£679.24' },
    { name: 'Shanghai', value: '3,024.56', change: '-0.52', inGBP: '£380.45' }
  ];

  return (
    <div className="relative bg-[#242832]/50 overflow-hidden h-10">
      {/* First animation layer */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ 
          x: [-2000],
          transition: {
            repeat: Infinity,
            duration: 30,
            ease: "linear",
            repeatType: "loop"
          }
        }}
        className="absolute flex items-center space-x-12 whitespace-nowrap py-2 px-4"
      >
        {[...indices, ...indices].map((index, i) => (
          <div key={i} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-[#ECE5F0]">{index.name}</span>
            <span className="text-sm text-[#ECE5F0]">{index.value}</span>
            <span className={`text-sm ${
              index.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>
              {index.change}%
            </span>
            <span className="text-sm font-medium text-[#ECE5F0]/70">{index.inGBP}</span>
          </div>
        ))}
      </motion.div>

      {/* Second animation layer for seamless loop */}
      <motion.div
        initial={{ x: 2000 }}
        animate={{ 
          x: [0],
          transition: {
            repeat: Infinity,
            duration: 30,
            ease: "linear",
            repeatType: "loop"
          }
        }}
        className="absolute flex items-center space-x-12 whitespace-nowrap py-2 px-4"
      >
        {[...indices, ...indices].map((index, i) => (
          <div key={`second-${i}`} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-[#ECE5F0]">{index.name}</span>
            <span className="text-sm text-[#ECE5F0]">{index.value}</span>
            <span className={`text-sm ${
              index.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>
              {index.change}%
            </span>
            <span className="text-sm font-medium text-[#ECE5F0]/70">{index.inGBP}</span>
          </div>
        ))}
      </motion.div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#1b1f27] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#1b1f27] to-transparent z-10" />
    </div>
  );
};

export default MarketTicker;