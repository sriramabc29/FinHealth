import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingAnalytics = ({ transactions, selectedBank, linkedBanks }) => {
  const [selectedView, setSelectedView] = useState('all');

  // Helper function to get week number
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  // Get initial balance for the selected view
  const getInitialBalance = () => {
    if (selectedView === 'all') {
      return linkedBanks.reduce((sum, bank) => 
        sum + bank.accounts.reduce((acc, account) => acc + account.balance, 0), 0);
    }
    return linkedBanks
      .find(bank => bank.id === selectedView)?.accounts
      .reduce((sum, account) => sum + account.balance, 0) || 0;
  };

  // Process data for balance graph (daily balances)
  const getDailyBalanceData = (bankTransactions) => {
    const initialBalance = getInitialBalance();
    let runningBalance = initialBalance;
    
    // Get all dates in the month
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Create array of all dates in month
    const allDates = [];
    for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      allDates.push(new Date(d).toISOString().split('T')[0]);
    }

    // Initialize daily data with initial balance
    const dailyData = allDates.reduce((acc, date) => {
      acc[date] = runningBalance;
      return acc;
    }, {});

    // Apply transactions
    bankTransactions
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(transaction => {
        const date = transaction.date;
        const amount = transaction.type === 'credit' ? transaction.amount : -transaction.amount;
        runningBalance += amount;
        dailyData[date] = runningBalance;
        
        // Update all future dates with new balance
        allDates
          .filter(d => d > date)
          .forEach(d => {
            dailyData[d] = runningBalance;
          });
      });

    // Convert to array format for chart
    return allDates.map(date => ({
      date,
      balance: parseFloat(dailyData[date].toFixed(2))
    }));
  };

  // Process data for spending graph (weekly spending)
  const getWeeklySpendingData = (bankTransactions) => {
    const weeklyData = bankTransactions
      .filter(t => t.type === 'debit')
      .reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toLocaleDateString('en-GB', { 
          month: 'short', 
          day: 'numeric' 
        });
        
        if (!acc[weekKey]) {
          acc[weekKey] = {
            spent: 0,
            transactions: 0,
            average: 0
          };
        }
        
        acc[weekKey].spent += transaction.amount;
        acc[weekKey].transactions += 1;
        acc[weekKey].average = acc[weekKey].spent / acc[weekKey].transactions;
        
        return acc;
      }, {});

    return Object.entries(weeklyData).map(([week, data]) => ({
      week,
      spent: parseFloat(data.spent.toFixed(2)),
      average: parseFloat(data.average.toFixed(2))
    }));
  };

  const currentTransactions = selectedView === 'all' 
    ? Object.values(transactions).flat()
    : transactions[selectedView] || [];

  return (
    <div className="bg-[#1b1f27] rounded-2xl p-6 shadow-lg border border-[#2191FB]/10">
      {/* Account Selection */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#ECE5F0]">Spending Analytics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedView('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedView === 'all' 
                ? 'bg-[#2191FB] text-white' 
                : 'text-[#ECE5F0]/70 hover:bg-[#2191FB]/10'
            }`}
          >
            All Accounts
          </button>
          {linkedBanks.map(bank => (
            <button
              key={bank.id}
              onClick={() => setSelectedView(bank.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedView === bank.id 
                  ? 'bg-[#2191FB] text-white' 
                  : 'text-[#ECE5F0]/70 hover:bg-[#2191FB]/10'
              }`}
            >
              {bank.name}
            </button>
          ))}
        </div>
      </div>

      {/* Balance Graph */}
      <div className="mb-8">
        <h3 className="text-[#ECE5F0] mb-4">Balance Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getDailyBalanceData(currentTransactions)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2191FB20" />
              <XAxis 
                dataKey="date" 
                stroke="#ECE5F0" 
                tick={{ fill: '#ECE5F0' }}
                tickFormatter={date => new Date(date).toLocaleDateString('en-GB', { 
                  day: 'numeric',
                  month: 'short'
                })}
              />
              <YAxis 
                stroke="#ECE5F0" 
                tick={{ fill: '#ECE5F0' }}
                tickFormatter={value => `£${value.toLocaleString()}`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1b1f27',
                  border: '1px solid rgba(33, 145, 251, 0.1)',
                  borderRadius: '8px',
                  color: '#ECE5F0'
                }}
                formatter={value => `£${value.toLocaleString()}`}
                labelFormatter={date => new Date(date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#2191FB" 
                strokeWidth={2}
                dot={{ fill: '#2191FB', r: 4 }}
                activeDot={{ r: 6, fill: '#2191FB' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending Graph */}
      <div>
        <h3 className="text-[#ECE5F0] mb-4">Weekly Spending</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getWeeklySpendingData(currentTransactions)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2191FB20" />
              <XAxis 
                dataKey="week" 
                stroke="#ECE5F0" 
                tick={{ fill: '#ECE5F0' }}
              />
              <YAxis 
                stroke="#ECE5F0" 
                tick={{ fill: '#ECE5F0' }}
                tickFormatter={value => `£${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1b1f27',
                  border: '1px solid rgba(33, 145, 251, 0.1)',
                  borderRadius: '8px',
                  color: '#ECE5F0'
                }}
                formatter={value => `£${value.toLocaleString()}`}
              />
              <Bar 
                dataKey="spent" 
                fill="#2191FB" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SpendingAnalytics;