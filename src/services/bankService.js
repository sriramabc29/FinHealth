// src/services/bankService.js
import { PlaidClient } from 'plaid';

const plaidClient = new PlaidClient({
  clientID: process.env.REACT_APP_PLAID_CLIENT_ID,
  secret: process.env.REACT_APP_PLAID_SECRET,
  environment: 'sandbox' // Use 'sandbox' for testing, 'development' or 'production' for real integration
});

// Test UK banks available in Plaid sandbox:
const TEST_BANKS = [
  { id: 'hsbc_uk', name: 'HSBC UK', icon: '/bank-icons/hsbc.svg' },
  { id: 'barclays_uk', name: 'Barclays', icon: '/bank-icons/barclays.svg' },
  { id: 'natwest', name: 'NatWest', icon: '/bank-icons/natwest.svg' },
  { id: 'lloyds', name: 'Lloyds Bank', icon: '/bank-icons/lloyds.svg' },
  { id: 'santander_uk', name: 'Santander UK', icon: '/bank-icons/santander.svg' }
];

// Mock test accounts for development
const TEST_ACCOUNTS = {
  'hsbc_uk': [
    { id: 'acc_1', name: 'Current Account', balance: 2450.75, currency: 'GBP', type: 'current' },
    { id: 'acc_2', name: 'Savings Account', balance: 15780.50, currency: 'GBP', type: 'savings' }
  ],
  'barclays_uk': [
    { id: 'acc_3', name: 'Barclays Current', balance: 3200.00, currency: 'GBP', type: 'current' }
  ]
};