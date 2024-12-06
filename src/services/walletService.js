// walletService.js
const API_BASE_URL = 'http://localhost:8083/api/v1/wallet';
const csrfToken = localStorage.getItem('csrfToken');
const tokenType = localStorage.getItem('tokenType');

export const walletService = {
  async getWalletInfo(userId) {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${csrfToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wallet data');
    }
    const data = await response.json()
    return data;
  },
};