import React, { createContext, useContext, useState } from 'react';
import { User, BankAccount, Transaction, Goal } from '../types';

interface UserContextType {
  user: User | null;
  linkBank: (bankCredentials: any) => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  updateGoal: (goal: Goal) => void;
  calculateFinancialScore: () => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const linkBank = async (bankCredentials: any) => {
    // Implement Plaid/Yodlee integration here
    try {
      // API call to link bank
      // Update user's linkedAccounts
    } catch (error) {
      console.error('Failed to link bank:', error);
    }
  };

  const addTransaction = (transaction: Transaction) => {
    if (!user) return;
    setUser(prev => ({
      ...prev!,
      transactions: [...prev!.transactions, transaction]
    }));
  };

  const updateGoal = (updatedGoal: Goal) => {
    if (!user) return;
    setUser(prev => ({
      ...prev!,
      goals: prev!.goals.map(goal => 
        goal.id === updatedGoal.id ? updatedGoal : goal
      )
    }));
  };

  const calculateFinancialScore = () => {
    if (!user) return 0;
    // Implement scoring algorithm based on:
    // - Savings rate
    // - Debt ratio
    // - Investment diversity
    // - Spending patterns
    return 0; // Placeholder
  };

  return (
    <UserContext.Provider value={{
      user,
      linkBank,
      addTransaction,
      updateGoal,
      calculateFinancialScore
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};