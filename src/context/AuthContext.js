// src/context/AuthContext.js - Part 1: Imports and Initial Setup
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // User States
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Bank States
  const [linkedBanks, setLinkedBanks] = useState(() => {
    const savedBanks = localStorage.getItem('linkedBanks');
    return savedBanks ? JSON.parse(savedBanks) : {};
  });

  const [bankOrder, setBankOrder] = useState(() => {
    const savedOrder = localStorage.getItem('bankOrder');
    return savedOrder ? JSON.parse(savedOrder) : {};
  });

  // Part 2: Persistence Logic
  useEffect(() => {
    localStorage.setItem('bankOrder', JSON.stringify(bankOrder));
  }, [bankOrder]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('linkedBanks', JSON.stringify(linkedBanks));
  }, [linkedBanks]);

  // Part 3: Authentication Functions
  const register = async (email, password, pin, fullName) => {
    try {
      const exists = registeredUsers.some(user => user.email === email);
      if (exists) {
        throw new Error('User already exists');
      }

      const newUser = { 
        id: Date.now().toString(),
        email, 
        password, 
        pin, 
        fullName,
        dateJoined: new Date().toISOString()
      };

      setRegisteredUsers(prev => [...prev, newUser]);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password, pin) => {
    try {
      const user = registeredUsers.find(u => u.email === email);
      
      if (!user) throw new Error('User not found');
      if (user.password !== password) throw new Error('Invalid password');
      if (user.pin !== pin) throw new Error('Invalid PIN');

      const userWithBanks = {
        ...user,
        linkedBanks: linkedBanks[user.id] || []
      };

      setUser(userWithBanks);
      localStorage.setItem('currentUser', JSON.stringify(userWithBanks));
      return { success: true, user: userWithBanks };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Part 4: Bank Management Functions
  const reorderBanks = (userId, newOrder) => {
    setBankOrder({
      ...bankOrder,
      [userId]: newOrder
    });
  };

  const linkBank = async (bankData) => {
    try {
      if (!user) throw new Error('No user logged in');

      const newBank = {
        id: bankData.id,
        name: bankData.name,
        logo: bankData.logo,
        accounts: bankData.accounts || [],
        dateLinked: new Date().toISOString(),
        lastSync: new Date().toISOString(),
        transactions: []
      };

      const updatedBanks = {
        ...linkedBanks,
        [user.id]: [...(linkedBanks[user.id] || []), newBank]
      };

      setLinkedBanks(updatedBanks);
      
      const updatedUser = {
        ...user,
        linkedBanks: updatedBanks[user.id]
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      return { success: true, bank: newBank };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const unlinkBank = async (bankId) => {
    try {
      if (!user) throw new Error('No user logged in');

      const updatedBanks = {
        ...linkedBanks,
        [user.id]: linkedBanks[user.id].filter(bank => bank.id !== bankId)
      };

      setLinkedBanks(updatedBanks);
      
      const updatedUser = {
        ...user,
        linkedBanks: updatedBanks[user.id]
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateBankTransactions = async (bankId, transactions) => {
    try {
      if (!user) throw new Error('No user logged in');

      const updatedBanks = {
        ...linkedBanks,
        [user.id]: linkedBanks[user.id].map(bank => 
          bank.id === bankId 
            ? { ...bank, transactions, lastSync: new Date().toISOString() }
            : bank
        )
      };

      setLinkedBanks(updatedBanks);
      
      const updatedUser = {
        ...user,
        linkedBanks: updatedBanks[user.id]
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Part 5: Context Provider and Hook
  return (
    <AuthContext.Provider value={{ 
      user,
      register,
      login,
      logout,
      isAuthenticated: !!user,
      linkBank,
      unlinkBank,
      updateBankTransactions,
      linkedBanks: user ? linkedBanks[user.id] || [] : [],
      reorderBanks,
      bankOrder,
      setLinkedBanks
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;