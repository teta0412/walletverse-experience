// // This file will contain all API calls related to transactions
// export const createTransaction = async (transactionData) => {
//   console.log('Creating transaction:', transactionData);
//   // TODO: Implement actual API call
//   return Promise.resolve({ success: true, data: transactionData });
// };

export const searchTransactions = async (filters) => {
  console.log('Searching transactions with filters:', filters);
  // TODO: Implement actual API call
  return Promise.resolve({ data: [] });
};

// transactionService.js
const API_BASE_URL = 'http://localhost:8084/api/v1/transactions';
const csrfToken = localStorage.getItem('csrfToken');
const tokenType = localStorage.getItem('tokenType');

export const transactionService = {
  async getTransactionHistory(page) {
    const response = await fetch(`${API_BASE_URL}/history/${localStorage.getItem('walletId')}?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${csrfToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    const data = await response.json()
    return data;
  },
  async createTransaction(transactionData) {
    try {
      const csrfToken = localStorage.getItem('csrfToken');
      const tokenType = localStorage.getItem('tokenType');
      transactionData = {
        fromWalletId: ownWalletId,
        ...transactionData
      }
      console.log(transactionData)

      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${tokenType} ${csrfToken}`
        },
        credentials: 'include',
        body: JSON.stringify(transactionData)
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating transaction', error);
      throw error;
    }
  },
  async getTransactionStatistics() {
    const response = await fetch(`${API_BASE_URL}/stat/${localStorage.getItem('walletId')}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${csrfToken}`
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to fetch transaction data');
    }
    const data = await response.json()
    return data.data;
  },
};