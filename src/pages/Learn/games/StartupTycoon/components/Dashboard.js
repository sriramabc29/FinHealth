// src/pages/Learn/games/StartupTycoon/components/Dashboard.js
import React from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const DashboardCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-[#242832] p-4 rounded-lg border border-[#2191FB]/10">
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 bg-[#2191FB]/10 rounded-lg">
        <Icon className="w-5 h-5 text-[#2191FB]" />
      </div>
      {trend && (
        <span className={`text-sm ${
          trend > 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-sm text-[#ECE5F0]/70">{title}</p>
      <p className="text-xl font-bold text-[#ECE5F0]">{value}</p>
    </div>
  </div>
);

const Dashboard = ({ gameState }) => {
  const profitMargin = ((gameState.revenue - gameState.monthlyExpenses) / 
                        gameState.revenue * 100) || 0;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <DashboardCard
          title="Cash"
          value={`£${gameState.cash.toLocaleString()}`}
          icon={CurrencyDollarIcon}
        />
        <DashboardCard
          title="Monthly Revenue"
          value={`£${gameState.revenue.toLocaleString()}`}
          icon={ChartBarIcon}
          trend={profitMargin}
        />
        <DashboardCard
          title="Team Size"
          value={gameState.employees.length}
          icon={UserGroupIcon}
        />
        <DashboardCard
          title="Business Level"
          value={gameState.businessLevel}
          icon={BuildingOfficeIcon}
        />
      </div>

      <div className="bg-[#242832] p-4 rounded-lg border border-[#2191FB]/10">
        <h3 className="font-medium text-[#ECE5F0] mb-4">Monthly Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#ECE5F0]/70">Revenue</span>
            <span className="text-[#ECE5F0]">£{gameState.revenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#ECE5F0]/70">Expenses</span>
            <span className="text-red-400">-£{gameState.monthlyExpenses.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-[#2191FB]/10 pt-2">
            <span className="text-[#ECE5F0]/70">Net Profit</span>
            <span className={gameState.revenue - gameState.monthlyExpenses > 0 ? 
                           'text-green-400' : 'text-red-400'}>
              £{(gameState.revenue - gameState.monthlyExpenses).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;