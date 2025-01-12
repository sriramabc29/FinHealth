export const UK_BANKS = [
    { id: 'hsbc_uk', name: 'HSBC UK', logo: '/images/banks/hsbc.svg' },
    { id: 'barclays', name: 'Barclays', logo: '/images/banks/barclays.svg' },
    { id: 'lloyds', name: 'Lloyds Bank', logo: '/images/banks/lloyds.svg' },
    { id: 'natwest', name: 'NatWest', logo: '/images/banks/natwest.svg' },
    { id: 'santander', name: 'Santander UK', logo: '/images/banks/santander.svg' },
  ];
  
  export const generateRandomTransactions = (bankId) => {
    const descriptions = [
      'Tesco Express', 'Amazon Prime', 'Netflix Subscription', 'Uber Ride',
      'Spotify Premium', 'Costa Coffee', "McDonald's", 'Train Ticket',
    ];
  
    const categories = [
      'Groceries', 'Subscriptions', 'Transportation', 'Entertainment', 'Dining',
    ];
  
    return Array.from({ length: 25 }, (_, i) => {
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const amount = parseFloat((Math.random() * 100).toFixed(2));
      const type = Math.random() > 0.5 ? 'debit' : 'credit';
      const date = new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30)))
        .toISOString()
        .split('T')[0];
  
      return { id: `${bankId}-${i + 1}`, description, amount, type, date, category };
    });
  };
  
  export const BANK_TRANSACTIONS = {
    hsbc_uk: generateRandomTransactions('hsbc_uk'),
    barclays: generateRandomTransactions('barclays'),
    lloyds: generateRandomTransactions('lloyds'),
    natwest: generateRandomTransactions('natwest'),
    santander: generateRandomTransactions('santander'),
  };