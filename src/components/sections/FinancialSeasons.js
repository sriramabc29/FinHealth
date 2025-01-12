// src/components/sections/FinancialSeasons.js

import React from 'react';
import { motion } from 'framer-motion';

const FinancialSeasons = () => {
  return (
    <motion.section
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.645, 0.045, 0.355, 1.000] }}
      className="min-h-screen bg-[#1b1f27] relative z-10"
    >
      {/* Main Title Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-5xl font-bold text-[#ECE5F0] mb-6">
            The 5 Financial Seasons of Life
          </h2>
          <p className="text-[#ECE5F0]/80 text-lg">
            Embrace your financial journey through life's natural seasons
          </p>

          {/* Average Savings Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-[#2191FB]/10 rounded-xl p-8 relative"
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <motion.svg
                width="40"
                height="60"
                viewBox="0 0 40 60"
                className="text-[#2191FB]"
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  d="M20 0 L40 30 L30 30 L30 60 L10 60 L10 30 L0 30 Z"
                  fill="currentColor"
                />
              </motion.svg>
            </div>
            <h3 className="text-3xl font-bold text-[#2191FB] mb-4">
              The average YNABer saves $600 in 2 months and $6,000 their first year
            </h3>
            <p className="text-[#ECE5F0]/70">
              And we don't like to play favorites or anything, but you seem well above average to us. Are you ready to be our next success story?
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinancialSeasons;