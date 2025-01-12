export interface User {
    id: string;
    name: string;
    email: string;
    financialScore: number;
    linkedAccounts: BankAccount[];
    goals: Goal[];
    transactions: Transaction[];
  }
  
  export interface BankAccount {
    id: string;
    name: string;
    type: 'checking' | 'savings' | 'investment';
    balance: number;
    institution: string;
    lastSync: Date;
  }
  
  export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    category: string;
    description: string;
    accountId: string;
    tags: string[];
  }
  
  export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
    type: 'savings' | 'investment' | 'debt';
  }