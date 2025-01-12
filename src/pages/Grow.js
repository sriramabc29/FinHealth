import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MarketTicker from '../components/grow/MarketTicker';
import DematAccountModal from '../components/grow/DematAccountModal';
import EnhancedAssetGrid from '../components/grow/EnhancedAssetGrid';
import EnhancedGoalsGrid from '../components/grow/EnhancedGoalsGrid';
import PortfolioView from '../components/grow/PortfolioView';
import {
  ArrowLeftIcon,
  PlusCircleIcon,
  ChartBarIcon,
  } from '@heroicons/react/24/outline';

// Storage keys
const STORAGE_KEYS = {
  USER_DATA: 'finhealth_user_data',
  ASSETS_DATA: 'finhealth_assets_data',
  GOALS_DATA: 'finhealth_goals_data',
  DEMAT_ACCOUNT: 'finhealth_demat_account'
};

// Asset Integration with Demat Account
const DematAccountInfo = ({ accountData, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#242832] p-6 rounded-xl border border-[#2191FB]/10 mb-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-[#ECE5F0]">Demat Account</h3>
          <p className="text-[#ECE5F0]/70 text-sm mt-1">ID: {accountData.dematId}</p>
        </div>
        <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
          Active
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={() => onAction('invest')}
          className="flex items-center justify-center space-x-2 p-3 bg-[#2191FB] 
                   text-white rounded-lg hover:bg-[#2191FB]/90"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Invest Now</span>
        </button>
        <button
          onClick={() => onAction('view')}
          className="flex items-center justify-center space-x-2 p-3 border 
                   border-[#2191FB] text-[#2191FB] rounded-lg hover:bg-[#2191FB]/10"
        >
          <ChartBarIcon className="w-5 h-5" />
          <span>View Portfolio</span>
        </button>
      </div>
    </motion.div>
  );
};

// Updated Main Content Section
const EnhancedMainContent = ({ section, userData }) => {
  const [dematAccount, setDematAccount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEMAT_ACCOUNT);
    return saved ? JSON.parse(saved) : null;
  });

  const [showDematModal, setShowDematModal] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAssetModal, setShowAssetModal] = useState(false);

  const handleAssetAction = (asset) => {
    if ((['indstocks', 'us-stocks', 'mutual-funds'].includes(asset.id)) && !dematAccount) {
      setShowDematModal(true);
      return;
    }
    setSelectedAsset(asset);
    setShowAssetModal(true);
  };

  const handleDematAction = (action) => {
    if (action === 'view') {
      setShowPortfolio(true);
    } else if (action === 'invest') {
      setShowAssetModal(true);
    }
  };

  const handleDematComplete = (accountData) => {
    setDematAccount(accountData);
    setShowDematModal(false);
  };

  return (
    <div className="space-y-8">
      {section === 'assets' ? (
        <>
          {dematAccount && <DematAccountInfo 
            accountData={dematAccount} 
            onAction={handleDematAction}
          />}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#ECE5F0]">Your Assets</h2>
            {!dematAccount && (
              <button
                onClick={() => setShowDematModal(true)}
                className="flex items-center space-x-2 text-sm text-[#2191FB] hover:text-[#2191FB]/80"
              >
                <PlusCircleIcon className="w-5 h-5" />
                <span>Open Demat Account</span>
              </button>
            )}
          </div>
          <EnhancedAssetGrid onAssetClick={handleAssetAction} />
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-[#ECE5F0]">Financial Goals</h2>
          <EnhancedGoalsGrid />
        </>
      )}

      {/* Modals */}
      {showDematModal && (
        <DematAccountModal 
          onClose={() => setShowDematModal(false)}
          onComplete={handleDematComplete}
        />
      )}

      {showAssetModal && selectedAsset && (
        <AssetAdditionModal
          asset={selectedAsset}
          onClose={() => setShowAssetModal(false)}
          onAdd={(data) => {
            // Handle asset addition
            setShowAssetModal(false);
          }}
        />
      )}

      {showPortfolio && (
        <PortfolioView 
          accountData={dematAccount}
          onClose={() => setShowPortfolio(false)} 
        />
      )}
    </div>
  );
};

// Add this component in the same file before the main Grow component
const AssetAdditionModal = ({ asset, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-[#242832] p-6 rounded-xl w-96 border border-[#2191FB]/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#ECE5F0]">Add {asset.name}</h3>
          <button onClick={onClose} className="text-[#ECE5F0]/70 hover:text-[#ECE5F0]">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[#ECE5F0] mb-2">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-[#ECE5F0] mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
            />
          </div>

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

        <div className="mt-6 flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border border-[#2191FB] text-[#2191FB]"
          >
            Cancel
          </button>
          <button
            onClick={() => onAdd(formData)}
            className="flex-1 py-3 rounded-lg bg-[#2191FB] text-white"
          >
            Add Asset
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Add this component for user onboarding
const UserOnboarding = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
      age: calculateAge(formData.dob)
    };
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    onComplete(userData);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-[#242832] p-8 rounded-xl border border-[#2191FB]/10 shadow-lg"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#ECE5F0]">Welcome to FinHealth</h2>
        <p className="text-[#ECE5F0]/70 mt-2">Complete your profile to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#ECE5F0] mb-2">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-[#ECE5F0] mb-2">Date of Birth</label>
          <input
            type="date"
            required
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full bg-[#1b1f27] text-[#ECE5F0] p-4 rounded-lg border border-[#2191FB]/20"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2191FB] text-white py-4 rounded-lg font-medium hover:bg-[#2191FB]/90"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
};

// Final Updated Grow Component
const Grow = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('assets');

  useEffect(() => {
    const savedUserData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1b1f27]">
      {/* Header */}
      <nav className="bg-[#1b1f27] border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigate('/dashboard')}
                  className="p-2 hover:bg-[#2191FB]/10 rounded-lg transition-all"
                >
                  <ArrowLeftIcon className="w-6 h-6 text-[#2191FB]" />
                </motion.button>
                {userData && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4"
                  >
                    <h1 className="text-2xl font-bold text-[#ECE5F0]">
                      {userData.name}'s Portfolio
                    </h1>
                    <span className="bg-[#2191FB]/10 px-3 py-1 rounded-full text-[#2191FB] font-medium">
                      Age {userData.age}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
            <MarketTicker />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {!userData ? (
          <UserOnboarding onComplete={setUserData} />
        ) : (
          <div className="space-y-8">
            {/* Section Tabs */}
            <div className="flex space-x-4 bg-[#242832] p-2 rounded-xl">
              <button
                onClick={() => setActiveSection('assets')}
                className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                  activeSection === 'assets'
                    ? 'bg-[#2191FB] text-white'
                    : 'text-[#ECE5F0] hover:bg-[#2191FB]/10'
                }`}
              >
                Assets
              </button>
              <button
                onClick={() => setActiveSection('goals')}
                className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                  activeSection === 'goals'
                    ? 'bg-[#2191FB] text-white'
                    : 'text-[#ECE5F0] hover:bg-[#2191FB]/10'
                }`}
              >
                Goals
              </button>
            </div>

            {/* Enhanced Main Content */}
            <EnhancedMainContent section={activeSection} userData={userData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Grow;


