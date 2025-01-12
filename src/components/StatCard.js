import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-[#2B2F3A] to-[#1b1f27] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
      </div>
      <div className="p-3 bg-[#2191FB]/10 rounded-lg">{icon}</div>
    </div>
  </motion.div>
);

export default StatCard;