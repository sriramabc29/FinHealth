const BASE_URL = process.env.REACT_APP_API_URL;

export const api = {
  async linkBank(credentials: any) {
    const response = await fetch(`${BASE_URL}/bank/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  async getTransactions(accountId: string) {
    const response = await fetch(`${BASE_URL}/transactions/${accountId}`);
    return response.json();
  },

  async updateGoal(goalId: string, updates: Partial<Goal>) {
    const response = await fetch(`${BASE_URL}/goals/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  },
};