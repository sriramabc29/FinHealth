// src/components/grow/AssetAdditionModal.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
    PlusCircleIcon,
    ChartBarIcon,
    InformationCircleIcon
  } from '@heroicons/react/24/outline';

  const AssetAdditionModal = ({ asset, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
      name: '',
      symbol: '',
      quantity: '',
      purchasePrice: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      category: asset.category, // From parent asset type
      assetType: asset.id,     // From parent asset type
      notes: '',
    });

      // Available stocks/funds for each category
  const availableAssets = {
    'uk-stocks': [
      { name: 'HSBC Holdings', symbol: 'HSBA.L', currentPrice: '610.90' },
      { name: 'Tesco PLC', symbol: 'TSCO.L', currentPrice: '285.30' },
      { name: 'BP PLC', symbol: 'BP.L', currentPrice: '470.55' },
      // Add your own stock option
      { name: 'Add Custom Stock', symbol: 'CUSTOM' }
    ],
    'etfs': [
      { name: 'iShares Core FTSE 100', symbol: 'ISF.L', currentPrice: '750.20' },
      { name: 'Vanguard FTSE 250', symbol: 'VMID.L', currentPrice: '1820.50' },
      // Add custom ETF
      { name: 'Add Custom ETF', symbol: 'CUSTOM' }
    ],
    // Add options for other asset types...
  }[asset.id] || [];
  
    // Predefined assets for each instrument type
    const assetOptions = {
        'uk-stocks': [
          { name: 'HSBC Holdings', symbol: 'HSBA.L', info: 'Banking & Financial Services' },
          { name: 'AstraZeneca', symbol: 'AZN.L', info: 'Pharmaceuticals' },
          { name: 'Shell', symbol: 'SHEL.L', info: 'Oil & Gas' },
          { name: 'Unilever', symbol: 'ULVR.L', info: 'Consumer Goods' },
          { name: 'BP', symbol: 'BP.L', info: 'Oil & Gas' },
          { name: 'GSK', symbol: 'GSK.L', info: 'Pharmaceuticals' },
          { name: 'British American Tobacco', symbol: 'BATS.L', info: 'Tobacco' },
          { name: 'Diageo', symbol: 'DGE.L', info: 'Beverages' }
        ],
      
        'etfs': [
          { name: 'iShares Core FTSE 100', symbol: 'ISF.L', info: 'UK Large Cap Index' },
          { name: 'Vanguard FTSE 250', symbol: 'VMID.L', info: 'UK Mid Cap Index' },
          { name: 'SPDR S&P UK Dividend Aristocrats', symbol: 'UKDV.L', info: 'UK Dividend Stocks' },
          { name: 'iShares Core FTSE All-Share', symbol: 'CSUK.L', info: 'Total UK Market' },
          { name: 'L&G FTSE All-World', symbol: 'VWRL.L', info: 'Global Stocks' }
        ],
      
        'mutual-funds': [
          { name: 'Fundsmith Equity Fund', symbol: 'GB00B41YBW71', info: 'Global Equity' },
          { name: 'Lindsell Train UK Equity', symbol: 'GB00BJFLM156', info: 'UK Equity' },
          { name: 'Marlborough UK Micro-Cap Growth', symbol: 'GB00B8F8YX59', info: 'UK Small Cap' },
          { name: 'Baillie Gifford Global Discovery', symbol: 'GB0006059330', info: 'Global Growth' }
        ],
      
        'investment-trusts': [
          { name: 'Scottish Mortgage', symbol: 'SMT.L', info: 'Global Growth' },
          { name: 'City of London', symbol: 'CTY.L', info: 'UK Equity Income' },
          { name: 'F&C Investment Trust', symbol: 'FCIT.L', info: 'Global Multi-Asset' },
          { name: 'Monks Investment Trust', symbol: 'MNKS.L', info: 'Global Growth' }
        ],
      
        'bonds': [
          { name: 'UK Gilt 2.75% 2024', symbol: 'GB00BHBFH458', info: 'Government Bond' },
          { name: 'iShares Core UK Gilts', symbol: 'IGLT.L', info: 'UK Government Bond ETF' },
          { name: 'Vanguard UK Gilt', symbol: 'VGOV.L', info: 'UK Government Bond ETF' }
        ],
      
        'fixed-deposits': [
          { name: 'NS&I Fixed Interest Savings', symbol: 'NSANDI-FI', info: 'Government Backed' },
          { name: 'Premium Bonds', symbol: 'NSANDI-PB', info: 'Prize Draw Savings' }
        ],
      
        'isas': [
          { name: 'Stocks & Shares ISA', symbol: 'SS-ISA', info: 'Tax-Free Investment Account' },
          { name: 'Lifetime ISA', symbol: 'LISA', info: 'For First Home or Retirement' },
          { name: 'Junior ISA', symbol: 'JISA', info: 'For Children Under 18' }
        ],
      
        'pensions': [
          { name: 'SIPP', symbol: 'SIPP', info: 'Self-Invested Personal Pension' },
          { name: 'Workplace Pension', symbol: 'WPP', info: 'Employer Pension Scheme' }
        ],
      
        'property': [
          { name: 'iShares UK Property', symbol: 'IUKP.L', info: 'UK Real Estate ETF' },
          { name: 'TR Property Trust', symbol: 'TRY.L', info: 'Property Investment Trust' },
          { name: 'L&G UK Property Fund', symbol: 'GB00BK35DT89', info: 'UK Property Fund' }
        ],

        };

  // Mock performance data
  const performanceData = [
    { month: 'Jan', price: 100 },
    { month: 'Feb', price: 120 },
    { month: 'Mar', price: 115 },
    { month: 'Apr', price: 130 },
    { month: 'May', price: 140 }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#242832] p-6 rounded-xl w-[500px] border border-[#2191FB]/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#ECE5F0]">Add {asset.name}</h3>
          <button onClick={onClose}>×</button>
        </div>

        <div className="space-y-6">
          {/* Asset Selection or Custom Input */}
          {availableAssets.length > 0 ? (
            <div>
              <label className="block text-[#ECE5F0] mb-2">Select Asset</label>
              <select
                value={formData.symbol}
                onChange={(e) => {
                  const selected = availableAssets.find(a => a.symbol === e.target.value);
                  setFormData({
                    ...formData,
                    symbol: e.target.value,
                    name: selected?.name || '',
                    purchasePrice: selected?.currentPrice || ''
                  });
                }}
                className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
              >
                <option value="">Select an asset</option>
                {availableAssets.map(item => (
                  <option key={item.symbol} value={item.symbol}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-[#ECE5F0] mb-2">Asset Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                placeholder="Enter asset name"
              />
            </div>
          )}

          {/* Show custom input if "Add Custom" is selected */}
          {formData.symbol === 'CUSTOM' && (
            <div>
              <label className="block text-[#ECE5F0] mb-2">Custom Asset Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                placeholder="Enter asset name"
              />
            </div>
          )}

          {/* Quantity and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#ECE5F0] mb-2">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label className="block text-[#ECE5F0] mb-2">Purchase Price</label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
                placeholder="Price per unit"
              />
            </div>
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block text-[#ECE5F0] mb-2">Purchase Date</label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[#ECE5F0] mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
              rows="3"
              placeholder="Add any notes..."
            />
          </div>
        </div>

        {/* Total Investment Preview */}
        <div className="mt-6 p-4 bg-[#1b1f27] rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-[#ECE5F0]">Total Investment</span>
            <span className="text-[#ECE5F0] font-bold">
              £{((formData.quantity || 0) * (formData.purchasePrice || 0)).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border border-[#2191FB] text-[#2191FB]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const newAsset = {
                id: Date.now(),
                ...formData,
                totalValue: formData.quantity * formData.purchasePrice
              };
              onAdd(newAsset);
            }}
            className="flex-1 py-3 rounded-lg bg-[#2191FB] text-white"
            disabled={!formData.name || !formData.quantity || !formData.purchasePrice}
          >
            Add Asset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetAdditionModal;