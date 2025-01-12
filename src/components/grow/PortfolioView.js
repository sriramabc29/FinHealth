// src/components/grow/PortfolioView.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const PortfolioView = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('stocks');
  
  // Mock data - replace with actual data from your storage
  const holdings = {
    stocks: [
      { id: 1, symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, avgPrice: 150.25, currentPrice: 175.50, change: '+2.5' },
      { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 5, avgPrice: 2750.00, currentPrice: 2800.00, change: '-0.8' },
      { id: 3, symbol: 'TSLA', name: 'Tesla Inc.', quantity: 8, avgPrice: 900.75, currentPrice: 950.25, change: '+1.2' }
    ],
    etfs: [
      { id: 1, symbol: 'VOO', name: 'Vanguard S&P 500 ETF', quantity: 15, avgPrice: 350.00, currentPrice: 375.25, change: '+1.5' },
      { id: 2, symbol: 'QQQ', name: 'Invesco QQQ Trust', quantity: 12, avgPrice: 325.50, currentPrice: 340.00, change: '+0.9' }
    ],
    mutualFunds: [
      { id: 1, symbol: 'VFIAX', name: 'Vanguard 500 Index Fund', units: 50, avgNAV: 275.50, currentNAV: 280.25, change: '+0.7' },
      { id: 2, symbol: 'FXAIX', name: 'Fidelity 500 Index Fund', units: 75, avgNAV: 125.75, currentNAV: 130.00, change: '+1.1' }
    ]
  };

  const calculateTotalValue = (holdings) => {
    return holdings.reduce((total, item) => {
      return total + (item.quantity || item.units) * item.currentPrice;
    }, 0);
  };

  const renderHoldingRow = (holding) => {
    const isProfit = holding.change.startsWith('+');
    const value = (holding.quantity || holding.units) * holding.currentPrice;
    const cost = (holding.quantity || holding.units) * holding.avgPrice;
    const profitLoss = value - cost;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1b1f27] p-4 rounded-lg mb-3 hover:bg-[#242832] transition-colors"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[#ECE5F0] font-medium">{holding.symbol}</h3>
            <p className="text-[#ECE5F0]/70 text-sm">{holding.name}</p>
          </div>
          <div className="text-right">
            <div className="text-[#ECE5F0]">£{value.toLocaleString()}</div>
            <div className={`text-sm ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
              {holding.change}%
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-[#ECE5F0]/70">Quantity</div>
            <div className="text-[#ECE5F0]">{holding.quantity || holding.units}</div>
          </div>
          <div>
            <div className="text-[#ECE5F0]/70">Avg. Price</div>
            <div className="text-[#ECE5F0]">£{holding.avgPrice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[#ECE5F0]/70">P/L</div>
            <div className={`${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              £{Math.abs(profitLoss).toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#242832] rounded-xl border border-[#2191FB]/10 w-full max-w-3xl mx-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#2191FB]/10">
          <h2 className="text-xl font-bold text-[#ECE5F0]">Portfolio Holdings</h2>
          <button onClick={onClose} className="text-[#ECE5F0]/70 hover:text-[#ECE5F0]">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Portfolio Summary */}
        <div className="p-6 border-b border-[#2191FB]/10">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-[#ECE5F0]/70 text-sm">Total Investment</div>
              <div className="text-xl font-bold text-[#ECE5F0]">
                £{calculateTotalValue(holdings[activeTab]).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[#ECE5F0]/70 text-sm">Today's Change</div>
              <div className="text-xl font-bold text-green-500">+£1,234.56</div>
            </div>
            <div>
              <div className="text-[#ECE5F0]/70 text-sm">Overall Return</div>
              <div className="text-xl font-bold text-green-500">+12.45%</div>
            </div>
          </div>
        </div>

        {/* Holdings Tabs */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            {['stocks', 'etfs', 'mutualFunds'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab 
                    ? 'bg-[#2191FB] text-white' 
                    : 'text-[#ECE5F0] hover:bg-[#2191FB]/10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
            <button className="ml-auto text-[#2191FB] hover:text-[#2191FB]/80">
              <AdjustmentsHorizontalIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Holdings List */}
          <div className="space-y-4">
            {holdings[activeTab].map(holding => renderHoldingRow(holding))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioView;