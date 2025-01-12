// src/components/banking/TransactionHistory.js
import React from 'react';
import { motion } from 'framer-motion';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="bg-[#2B2F3A] rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6">Transaction History</h3>
      
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1b1f27] p-4 rounded-xl flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${transaction.type === 'credit' ? 'bg-green-500/10' : 'bg-red-500/10'}
              `}>
                {transaction.type === 'credit' ? '↓' : '↑'}
              </div>
              <div>
                <p className="text-white font-medium">{transaction.description}</p>
                <p className="text-gray-400 text-sm">{transaction.date}</p>
              </div>
            </div>
            <span className={`font-medium ${
              transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
            }`}>
              {transaction.type === 'credit' ? '+' : '-'}
              £{transaction.amount.toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;