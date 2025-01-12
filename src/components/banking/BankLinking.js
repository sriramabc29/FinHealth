// src/components/banking/BankLinking.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEST_BANKS, TEST_ACCOUNTS } from '../../services/bankService';

const BankLinking = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [isLinking, setIsLinking] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setShowAuthModal(true);
  };

  const handleMockAuth = async () => {
    setIsLinking(true);
    // Simulate bank authentication process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLinkedAccounts(TEST_ACCOUNTS[selectedBank.id] || []);
    setIsLinking(false);
    setShowAuthModal(false);
  };

  return (
    <div className="bg-[#2B2F3A] rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Link Your UK Bank Account</h2>
      
      {/* Bank Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {TEST_BANKS.map(bank => (
          <motion.button
            key={bank.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBankSelect(bank)}
            className="bg-[#1b1f27] p-4 rounded-lg text-center hover:bg-[#2191FB]/10 transition-all"
          >
            <img src={bank.icon} alt={bank.name} className="w-12 h-12 mx-auto mb-2" />
            <p className="text-white font-medium">{bank.name}</p>
          </motion.button>
        ))}
      </div>

      {/* Mock Bank Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#2B2F3A] p-6 rounded-xl max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Log in to {selectedBank.name}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 bg-[#1b1f27] text-white rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-[#1b1f27] text-white rounded-lg"
              />
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMockAuth}
                  disabled={isLinking}
                  className="flex-1 px-4 py-2 bg-[#2191FB] text-white rounded-lg"
                >
                  {isLinking ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Linked Accounts */}
      {linkedAccounts.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Linked Accounts</h3>
          {linkedAccounts.map(account => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1b1f27] p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="text-white font-medium">{account.name}</h4>
                <p className="text-gray-400 text-sm capitalize">{account.type}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">
                  £{account.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-gray-400 text-sm">{account.currency}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankLinking;