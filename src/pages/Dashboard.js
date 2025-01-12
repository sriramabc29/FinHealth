import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SpendingAnalytics from '../components/analytics/SpendingAnalytics';
import FinancialHealthModal from '../components/analytics/FinancialHealthModal';
import { 
  BanknotesIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  UserCircleIcon, 
  TrashIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const UK_BANKS = [
    { id: 'hsbc_uk', name: 'HSBC UK', logo: '/images/banks/hsbc.png' },
    { id: 'barclays', name: 'Barclays', logo: '/images/banks/barclays.png' },
    { id: 'lloyds', name: 'Lloyds Bank', logo: '/images/banks/lloyds.png' },
    { id: 'natwest', name: 'NatWest', logo: '/images/banks/natwest.png' },
    { id: 'santander', name: 'Santander UK', logo: '/images/banks/santander.png' },
  ];
  
  const DEFAULT_BANKS = [
    {
      id: 'hsbc_uk',
      name: 'HSBC UK',
      accounts: [
        { type: 'Current Account', balance: 2000 },
        { type: 'Savings Account', balance: 8000 },
      ],
    },
    {
      id: 'barclays',
      name: 'Barclays',
      accounts: [
        { type: 'Current Account', balance: 1500 },
        { type: 'Savings Account', balance: 3500 },
      ],
    },
  ];

  const generateRandomTransactions = (bankId) => {
    const descriptions = [
      'Tesco Express', 'Amazon Prime', 'Netflix Subscription', 'Uber Ride',
      'Spotify Premium', 'Costa Coffee', "McDonald's", 'Train Ticket',
    ];
  
    const categories = [
      'Groceries', 'Subscriptions', 'Transportation', 'Entertainment', 'Dining',
    ];
  
    return Array.from({ length: 25 }, (_, i) => ({
      id: `${bankId}-${i + 1}`,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: parseFloat((Math.random() * 100).toFixed(2)),
      type: Math.random() > 0.5 ? 'debit' : 'credit',
      date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30)))
        .toISOString()
        .split('T')[0],
    }));
  };

// Components
const StatCard = ({ title, value, icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#242832] p-6 rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
        <div className="p-2 rounded-lg">
          {React.cloneElement(icon, { className: "w-6 h-6 text-[#2191FB]" })}
        </div>
      </div>
    </motion.div>
  );

const BankTransactions = ({ transactions }) => (
  <div className="space-y-4">
    {transactions.map((transaction) => (
      <motion.div
        key={transaction.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 bg-[#1b1f27] rounded-xl flex justify-between items-center 
                   hover:bg-[#1b1f27]/90 transition-all border border-[#2191FB]/10"
      >
        <div>
          <p className="text-[#ECE5F0] font-medium">{transaction.description}</p>
          <p className="text-[#ECE5F0]/70 text-sm">{transaction.date}</p>
          <span className="text-xs text-[#ECE5F0]/50">{transaction.category}</span>
        </div>
        <p className={`font-medium ${
          transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
        }`}>
          {transaction.type === 'credit' ? '+' : '-'}£{transaction.amount.toFixed(2)}
        </p>
      </motion.div>
    ))}
  </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // State Management with localStorage persistence
    const [linkedBanks, setLinkedBanks] = useState(() => {
        try {
            const savedBanks = localStorage.getItem('linkedBanks');
            const parsedBanks = savedBanks ? JSON.parse(savedBanks) : DEFAULT_BANKS;
            return Array.isArray(parsedBanks) ? parsedBanks : DEFAULT_BANKS;
        } catch (error) {
            console.error('Error loading banks:', error);
            return DEFAULT_BANKS;
        }
    });
  
    // UI State Management
    const [selectedBank, setSelectedBank] = useState(null);
    const [totalBalance, setTotalBalance] = useState(0);
    const [monthlySpending, setMonthlySpending] = useState(0);
    const [financialHealthScore, setFinancialHealthScore] = useState(0);
    const [showAddBankModal, setShowAddBankModal] = useState(false);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [transactions, setTransactions] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

  
    // Initialize Transactions and Data
   useEffect(() => {
  const initTransactions = () => {
    const newTransactions = {};
    linkedBanks.forEach(bank => {
      if (!transactions[bank.id]) {
        newTransactions[bank.id] = generateRandomTransactions(bank.id);
      }
    });
    setTransactions(prev => ({ ...prev, ...newTransactions }));
    setIsLoading(false);
  };

  initTransactions();
}, [linkedBanks, transactions]);
  
    // Persist Data
    useEffect(() => {
      try {
        localStorage.setItem('linkedBanks', JSON.stringify(linkedBanks));
      } catch (error) {
        console.error('Error saving banks:', error);
      }
    }, [linkedBanks]);
  
    // Calculations
    const calculateTotalBalance = useCallback(() => {
      const total = linkedBanks.reduce(
        (sum, bank) =>
          sum + bank.accounts.reduce((accountSum, account) => accountSum + account.balance, 0),
        0
      );
      setTotalBalance(total);
    }, [linkedBanks]);
  
    const calculateMonthlySpending = useCallback(() => {
      let currentTransactions = [];
      if (selectedBank) {
        currentTransactions = transactions[selectedBank.id] || [];
      } else {
        Object.values(transactions).forEach(bankTransactions => {
          currentTransactions = currentTransactions.concat(bankTransactions);
        });
      }
  
      const totalSpending = currentTransactions
        .filter(transaction => transaction.type === 'debit')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
  
      setMonthlySpending(totalSpending.toFixed(2));
    }, [selectedBank, transactions]);
  
    const calculateFinancialHealthScore = useCallback(() => {
      const score = Math.min(100, Math.round((totalBalance / (monthlySpending + 1)) * 10));
      setFinancialHealthScore(score);
    }, [totalBalance, monthlySpending]);
  
    // Update calculations when data changes
    useEffect(() => {
      if (!isLoading) {
        calculateTotalBalance();
        calculateMonthlySpending();
        calculateFinancialHealthScore();
      }
    }, [
      isLoading,
      calculateTotalBalance,
      calculateMonthlySpending,
      calculateFinancialHealthScore,
    ]);
  
    // Event Handlers
    const addBankAccount = (bank) => {
      if (!linkedBanks.find(b => b.id === bank.id)) {
        const newBank = {
          id: bank.id,
          name: bank.name,
          accounts: [
            { type: 'Current Account', balance: Math.random() * 5000 },
            { type: 'Savings Account', balance: Math.random() * 10000 },
          ],
        };
        setLinkedBanks(prev => [...prev, newBank]);
        setTransactions(prev => ({
          ...prev,
          [bank.id]: generateRandomTransactions(bank.id),
        }));
      }
      setShowAddBankModal(false);
    };
  
    // Additional Event Handlers
  const removeBankAccount = (bankId) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this bank account? This action cannot be undone.'
    );
    
    if (confirmed) {
      setLinkedBanks(prev => prev.filter(bank => bank.id !== bankId));
      setTransactions(prev => {
        const newTransactions = { ...prev };
        delete newTransactions[bankId];
        return newTransactions;
      });
      if (selectedBank?.id === bankId) {
        setSelectedBank(null);
      }
    }
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank === selectedBank ? null : bank);
  };

  // Add this with your other state declarations
const [showSpendingAnalytics, setShowSpendingAnalytics] = useState(false);

const [showFinancialHealth, setShowFinancialHealth] = useState(false);
   


return (
    <div  className="min-h-screen bg-[#1e212b]">
      {/* Navigation */}
      <nav className="bg-[#1b1f27] border-b border-gray-800">
      {/* Navigation Items */}
<div className="flex items-center justify-between">
  <div className="text-2xl font-bold text-white">Finhealth</div>
  
  <div className="flex items-center space-x-6">
    {/* Navigation Links */}
    <div className="flex items-center space-x-6">
      <button 
        onClick={() => navigate('/grow')}
        className="text-gray-300 hover:text-white transition-colors"
      >
        Grow
      </button>
      
      <button 
        onClick={() => navigate('/grow-plus')}
        className="text-gray-300 hover:text-white transition-colors"
      >
        Grow +
      </button>
      
      <button 
        onClick={() => navigate('/learn')}
        className="text-gray-300 hover:text-white transition-colors"
      >
        Learn
      </button>
      
      <button 
        onClick={() => navigate('/connect')}
        className="text-gray-300 hover:text-white transition-colors"
      >
        Connect
      </button>
    </div>

    {/* User Section */}
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <UserCircleIcon className="w-5 h-5 text-[#2191FB]" />
        <span className="text-gray-300">{user?.email || 'User'}</span>
      </div>
      
      <button
        onClick={handleLogout}
        className="text-gray-300 hover:text-white px-4 py-2 rounded-lg 
                 border border-gray-800 hover:bg-[#2191FB]/10 transition-all"
      >
        Log Out
      </button>
    </div>
  </div>
</div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card with Dropdown */}
          <div 
            className="relative" 
            onMouseEnter={() => setShowBreakdown(true)} 
            onMouseLeave={() => setShowBreakdown(false)}
          >
            <StatCard
              title="Total Balance"
              value={`£${totalBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`}
              icon={<BanknotesIcon />}
            />
            
            {showBreakdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 mt-2 w-full bg-[#1b1f27] shadow-lg rounded-lg p-4 z-10 border border-[#2191FB]/10"
              >
                <h4 className="text-sm text-[#ECE5F0]/70 mb-2">Balance Breakdown</h4>
                {linkedBanks.map((bank) => (
                  <div key={bank.id} className="mb-4 last:mb-0">
                    <p className="text-[#ECE5F0] font-bold">{bank.name}</p>
                    {bank.accounts.map((account, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 text-sm text-[#ECE5F0]/70">
                        <span>{account.type}</span>
                        <span>£{account.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Monthly Spending */}
          
          {/* Monthly Spending with Analytics */}
<div className="relative">
  <div 
    onClick={() => setShowSpendingAnalytics(prev => !prev)} 
    className="cursor-pointer"
  >
    <StatCard
      title="Monthly Spending"
      value={`£${monthlySpending}`}
      icon={<CreditCardIcon />}
    />
  </div>
  
  {/* Spending Analytics Modal */}
  {showSpendingAnalytics && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowSpendingAnalytics(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-[#1b1f27] p-8 rounded-2xl max-w-6xl w-full m-4 border border-[#2191FB]/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#ECE5F0]">Spending Analytics</h2>
          <button
            onClick={() => setShowSpendingAnalytics(false)}
            className="p-2 hover:bg-[#2191FB]/10 rounded-lg"
          >
            <ArrowLeftIcon className="w-5 h-5 text-[#2191FB]" />
          </button>
        </div>
        
        {/* Analytics Component */}
        <SpendingAnalytics 
          transactions={transactions}
          selectedBank={selectedBank}
          linkedBanks={linkedBanks}
        />
      </motion.div>
    </motion.div>
  )}
</div>

          {/* Financial Health */}
          <div className="relative">
  <div 
    onClick={() => setShowFinancialHealth(true)} 
    className="cursor-pointer"
  >
    <StatCard
      title="Financial Health"
      value={`${financialHealthScore} / 100`}
      icon={<ChartBarIcon />}
    />
  </div>

  {showFinancialHealth && (
    <FinancialHealthModal
      financialHealthScore={financialHealthScore}
      totalBalance={totalBalance}
      monthlySpending={monthlySpending}
      onClose={() => setShowFinancialHealth(false)}
    />
  )}
</div>
        </div>

        {/* Bank Accounts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {linkedBanks.map((bank) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 bg-[#1b1f27] rounded-2xl shadow-lg border border-[#2191FB]/10 
                hover:shadow-xl cursor-pointer transition-all
                ${selectedBank?.id === bank.id ? 'ring-2 ring-[#2191FB]' : ''}`}
              onClick={() => handleBankSelect(bank)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-[#2191FB]/10 rounded-lg">
                  <img 
              src={`/images/banks/${bank.id}.png`} 
              alt={bank.name} 
              className="w-8 h-8 object-contain"
            />
                  </div>
                  <div>
                    <h3 className="text-[#ECE5F0] font-medium">{bank.name}</h3>
                    {bank.accounts.map((account, idx) => (
                      <p key={idx} className="text-[#ECE5F0]/70 text-sm">
                        {account.type}: £{account.balance.toLocaleString('en-GB')}
                      </p>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBankAccount(bank.id);
                  }}
                  className="p-2 hover:bg-red-500/10 rounded-lg group"
                >
                  <TrashIcon className="w-5 h-5 text-[#ECE5F0]/40 group-hover:text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Bank Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => setShowAddBankModal(true)}
          className="bg-[#2191FB] text-[#ECE5F0] px-8 py-3 rounded-lg font-medium hover:bg-[#2191FB]/90 transition-all"
        >
          Add Bank Account
        </motion.button>

        {/* Add Bank Modal */}
        {showAddBankModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddBankModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-[#1b1f27] p-8 rounded-2xl max-w-md w-full m-4 border border-[#2191FB]/10"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-[#ECE5F0] mb-4">Add a Bank</h3>
              <div className="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto">
                {UK_BANKS
                  .filter(bank => !linkedBanks.find(b => b.id === bank.id))
                  .map((bank) => (
                    <motion.div
                      key={bank.id}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer bg-[#1b1f27]/50 p-4 rounded-lg hover:bg-[#2191FB]/10 border border-[#2191FB]/10"
                      onClick={() => addBankAccount(bank)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-[#2191FB]/10 rounded-lg">
                        <img 
                src={`/images/banks/${bank.id}.png`}
                alt={bank.name}
                className="w-8 h-8 object-contain"
              />
                        </div>
                        <span className="text-[#ECE5F0]">{bank.name}</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
              <button
                onClick={() => setShowAddBankModal(false)}
                className="mt-4 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Transactions Section */}
        {selectedBank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setSelectedBank(null)}
                className="p-2 hover:bg-[#2191FB]/10 rounded-lg transition-all"
              >
                <ArrowLeftIcon className="w-5 h-5 text-[#2191FB]" />
              </button>
              <h2 className="text-xl text-[#ECE5F0]">{selectedBank.name} Transactions</h2>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2191FB]"></div>
              </div>
            ) : (
              <BankTransactions transactions={transactions[selectedBank.id] || []} />
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && linkedBanks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#ECE5F0]/70 mb-4">No bank accounts linked yet</p>
            <button
              onClick={() => setShowAddBankModal(true)}
              className="bg-[#2191FB] text-[#ECE5F0] px-6 py-2 rounded-lg hover:bg-[#2191FB]/90 transition-all"
            >
              Link Your First Bank
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;