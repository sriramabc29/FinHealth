// src/components/banking/BankCard.js
import React from 'react';
import { motion } from 'framer-motion';

// Import bank logos (store these in your public/images folder)
const BANK_LOGOS = {
  'hsbc': '/images/banks/hsbc.svg',
  'barclays': '/images/banks/barclays.svg',
  'lloyds': '/images/banks/lloyds.svg',
  'natwest': '/images/banks/natwest.svg',
  'santander': '/images/banks/santander.svg'
};

const BankCard = ({ bank, isSelected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: isSelected ? -20 : 0,
        zIndex: isSelected ? 10 : 0
      }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative cursor-pointer
        bg-gradient-to-br from-[#2B2F3A] to-[#1b1f27]
        p-6 rounded-2xl shadow-lg
        transform transition-all duration-300
        ${isSelected ? 'ring-2 ring-[#2191FB]' : ''}
      `}
      style={{
        boxShadow: isSelected 
          ? '0 20px 40px rgba(33, 145, 251, 0.1)'
          : '0 10px 30px rgba(0,0,0,0.1)'
      }}
    >
      <div className="flex justify-between items-start mb-8">
        <img 
          src={BANK_LOGOS[bank.id]} 
          alt={bank.name}
          className="h-8 w-auto"
        />
        <div className="text-right">
          <p className="text-white font-medium">{bank.name}</p>
          <p className="text-gray-400 text-sm">Connected</p>
        </div>
      </div>

      <div className="space-y-3">
        {bank.accounts.map((account, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-gray-400">{account.type}</span>
            <span className="text-white font-medium">
              £{account.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BankCard;