import React from 'react';
import { motion } from 'framer-motion';
import { 
  BanknotesIcon, 
  CreditCardIcon, 
  ArrowLeftIcon,
  WalletIcon,
  ChartPieIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

const FinancialHealthModal = ({ 
  financialHealthScore, 
  totalBalance, 
  monthlySpending,
  onClose 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-[#1b1f27] p-8 rounded-2xl max-w-6xl w-full m-4 border border-[#2191FB]/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#ECE5F0]">Financial Health Overview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2191FB]/10 rounded-lg transition-all"
          >
            <ArrowLeftIcon className="w-5 h-5 text-[#2191FB]" />
          </button>
        </div>

        {/* Score Display */}
        <div className="text-center mb-8">
          <div className="inline-block p-8 bg-[#2191FB]/10 rounded-full mb-4">
            <span className="text-5xl font-bold text-[#2191FB]">{financialHealthScore}</span>
            <span className="text-xl text-[#ECE5F0]/70">/100</span>
          </div>
          <p className="text-[#ECE5F0]/70">Your Financial Health Score</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#242832] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#ECE5F0]">Total Balance</h3>
              <BanknotesIcon className="w-5 h-5 text-[#2191FB]" />
            </div>
            <p className="text-2xl font-bold text-[#ECE5F0]">
              £{totalBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-[#242832] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#ECE5F0]">Monthly Spending</h3>
              <CreditCardIcon className="w-5 h-5 text-[#2191FB]" />
            </div>
            <p className="text-2xl font-bold text-[#ECE5F0]">
              £{parseFloat(monthlySpending).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Savings Analysis */}
          <div className="bg-[#242832] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#ECE5F0]">Savings Analysis</h3>
              <WalletIcon className="w-5 h-5 text-[#2191FB]" />
            </div>
            <p className="text-[#ECE5F0]/70 text-sm">
              Detailed breakdown of your saving patterns and recommendations.
              <span className="block mt-2 text-[#2191FB]">Coming Soon</span>
            </p>
          </div>

          {/* Investment Insights */}
          <div className="bg-[#242832] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#ECE5F0]">Investment Insights</h3>
              <ChartPieIcon className="w-5 h-5 text-[#2191FB]" />
            </div>
            <p className="text-[#ECE5F0]/70 text-sm">
              Personalized investment suggestions based on your goals.
              <span className="block mt-2 text-[#2191FB]">Coming Soon</span>
            </p>
          </div>

          {/* Risk Assessment */}
          <div className="bg-[#242832] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#ECE5F0]">Risk Assessment</h3>
              <ShieldExclamationIcon className="w-5 h-5 text-[#2191FB]" />
            </div>
            <p className="text-[#ECE5F0]/70 text-sm">
              Evaluation of your financial risks and mitigation strategies.
              <span className="block mt-2 text-[#2191FB]">Coming Soon</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinancialHealthModal;