// src/components/grow/EnhancedAssetGrid.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AssetAdditionModal from './AssetAdditionModal';
import { 
  WalletIcon, 
  BanknotesIcon,
  BuildingLibraryIcon,
  CurrencyPoundIcon,
  ChartBarIcon,
  PlusCircleIcon,
  GlobeAltIcon,
  HomeIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const EnhancedAssetGrid = ({ onAssetClick }) => {
    // State for assets and modal
    const [assets, setAssets] = useState(() => {
      const savedAssets = localStorage.getItem('finhealth_assets_data');
      return savedAssets ? JSON.parse(savedAssets) : [];
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
  
    // Add the handleAddAsset function
    const handleAddAsset = (newAsset) => {
      const updatedAssets = [...assets, newAsset];
      setAssets(updatedAssets);
      localStorage.setItem('finhealth_assets_data', JSON.stringify(updatedAssets));
      setShowAddModal(false);
    };
  
    // Update the click handler
    const handleAssetClick = (asset) => {
      setSelectedAsset(asset);
      setShowAddModal(true);
    };
      

  const assetTypes = [
    // Stocks & ETFs
    { id: 'uk-stocks', name: 'UK Stocks', icon: CurrencyPoundIcon, category: 'market-investments' },
    { id: 'etfs', name: 'ETFs', icon: ChartBarIcon, category: 'market-investments' },
    { id: 'investment-trusts', name: 'Investment Trusts', icon: BuildingLibraryIcon, category: 'market-investments' },
    
    // Tax Wrappers
    { id: 'stocks-shares-isa', name: 'Stocks & Shares ISA', icon: WalletIcon, category: 'tax-wrappers', 
      limit: '£20,000 per year' },
    { id: 'lifetime-isa', name: 'Lifetime ISA', icon: HomeIcon, category: 'tax-wrappers', 
      limit: '£4,000 per year' },
    { id: 'sipp', name: 'SIPP', icon: BanknotesIcon, category: 'tax-wrappers', 
      limit: '£60,000 per year' },
    
    // Funds
    { id: 'mutual-funds', name: 'Mutual Funds', icon: ChartBarIcon, category: 'funds' },
    { id: 'index-funds', name: 'Index Funds', icon: ArrowTrendingUpIcon, category: 'funds' },
    
    // Fixed Income & Savings
    { id: 'bonds', name: 'Bonds', icon: BanknotesIcon, category: 'fixed-income' },
    { id: 'fixed-deposits', name: 'Fixed Deposits', icon: BuildingLibraryIcon, category: 'fixed-income' },
    { id: 'premium-bonds', name: 'Premium Bonds', icon: WalletIcon, category: 'fixed-income' },
    
    // Property & Alternatives
    { id: 'property', name: 'Property', icon: HomeIcon, category: 'alternatives' },
    { id: 'reits', name: 'REITs', icon: BuildingLibraryIcon, category: 'alternatives' },
    { id: 'gold', name: 'Gold', icon: WalletIcon, category: 'alternatives' }
  ];

   // Group assets by category
   const assetCategories = {
    'market-investments': 'Stocks & ETFs',
    'tax-wrappers': 'Tax-Efficient Wrappers',
    'funds': 'Investment Funds',
    'fixed-income': 'Fixed Income & Savings',
    'alternatives': 'Property & Alternatives'
  };

  // Add UK market tracking
  const marketIndicators = {
    'FTSE100': { value: '7,487.71', change: '+0.45%' },
    'FTSE250': { value: '18,919.76', change: '-0.23%' },
    'GBP/USD': { value: '1.2647', change: '+0.12%' }
  };

  // Calculate total value and returns for an asset
  const calculateAssetMetrics = (asset) => {
    let totalValue = 0;
    let totalReturns = 0;
    let taxRelief = 0;

    // Calculate tax relief for SIPP contributions
    if (asset.wrapperType === 'sipp') {
      taxRelief = (parseFloat(asset.amount) * 0.20); // Basic rate tax relief
    }

    // Calculate Lifetime ISA bonus
    if (asset.wrapperType === 'lifetime-isa') {
      taxRelief = (parseFloat(asset.amount) * 0.25); // 25% government bonus
    }

    if (asset.investmentType === 'lumpsum') {
      totalValue = parseFloat(asset.amount) + taxRelief;
      const currentValue = totalValue * 1.1; // Mock 10% return
      totalReturns = currentValue - totalValue;
    } else {
      const monthsSinceStart = Math.floor(
        (new Date() - new Date(asset.sipStartDate)) / (1000 * 60 * 60 * 24 * 30)
      );
      totalValue = (parseFloat(asset.sipAmount) * monthsSinceStart) + taxRelief;
      const currentValue = totalValue * 1.15; // Mock 15% return
      totalReturns = currentValue - totalValue;
    }

    return { totalValue, totalReturns, taxRelief };
  };

  const renderAssetCard = (asset) => {
    const investedAsset = assets.find(a => a.instrumentType === asset.id);
    const { totalValue, totalReturns, taxRelief } = investedAsset 
      ? calculateAssetMetrics(investedAsset) 
      : { totalValue: 0, totalReturns: 0, taxRelief: 0 };

    return (
      <motion.div
        key={asset.id}
        whileHover={{ scale: 1.02 }}
        className="bg-[#242832] p-4 rounded-xl cursor-pointer group border border-[#2191FB]/10
                  hover:border-[#2191FB]/30 transition-all"
                  onClick={() => handleAssetClick(asset)}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#2191FB]/10 p-3 rounded-lg group-hover:bg-[#2191FB]/20">
              <asset.icon className="w-6 h-6 text-[#2191FB]" />
            </div>
            {investedAsset && (
              <span className={`text-sm px-2 py-1 rounded-full ${
                totalReturns >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {totalReturns >= 0 ? '+' : ''}{((totalReturns / totalValue) * 100).toFixed(1)}%
              </span>
            )}
          </div>
          
          <span className="text-[#ECE5F0] text-sm mb-2">{asset.name}</span>
          
          {/* Show annual limit for tax wrappers */}
          {asset.limit && (
            <div className="text-xs text-[#ECE5F0]/70 mb-2">
              Limit: {asset.limit}
            </div>
          )}
          
          {investedAsset && (
            <div className="mt-2 pt-2 border-t border-[#2191FB]/10">
              <div className="text-sm text-[#ECE5F0]/70">
                Invested: £{totalValue.toLocaleString()}
              </div>
              <div className={`text-sm ${totalReturns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                Returns: £{Math.abs(totalReturns).toLocaleString()}
              </div>
              {taxRelief > 0 && (
                <div className="text-sm text-green-500">
                  Tax Relief: £{taxRelief.toLocaleString()}
                </div>
              )}
            </div>
          )}

          {!investedAsset && (
            <button 
              className="mt-3 w-full py-2 rounded-lg border border-[#2191FB]/20 text-[#2191FB]
                       hover:bg-[#2191FB] hover:text-white transition-colors flex items-center justify-center"
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Add {asset.category === 'tax-wrappers' ? 'Account' : 'Investment'}
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="bg-[#1b1f27] p-4 rounded-lg">
        <h3 className="text-lg font-medium text-[#ECE5F0] mb-4">Market Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(marketIndicators).map(([name, data]) => (
            <div key={name} className="bg-[#242832] p-3 rounded-lg">
              <div className="text-[#ECE5F0]/70 text-sm">{name}</div>
              <div className="text-[#ECE5F0] font-medium">{data.value}</div>
              <div className={`text-sm ${
                data.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {data.change}
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Asset Categories */}
      {Object.entries(assetCategories).map(([category, title]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-[#ECE5F0]">{title}</h3>
          <div className="grid grid-cols-3 gap-4">
            {assetTypes.filter(asset => asset.category === category).map(renderAssetCard)}
          </div>
        </div>
      ))}
  
      {/* Asset Addition Modal */}
      {showAddModal && selectedAsset && (
        <AssetAdditionModal
          asset={selectedAsset}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddAsset}
        />
      )}
    </div>
  );
};

export default EnhancedAssetGrid;