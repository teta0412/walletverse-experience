// src/services/reportService.js
const BASE_URL = 'http://localhost:8086/api/v1/reports/wallet';

export const reportService = {
  async getMonthlyReport(walletId) {
    try {
      const response = await fetch(`${BASE_URL}/${walletId}/current-month`);
      if (!response.ok) {
        throw new Error('Failed to fetch monthly report');
      }
      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch monthly report');
    }
  },

  async getYearlyReport(walletId) {
    try {
      const response = await fetch(`${BASE_URL}/${walletId}/current-year`);
      if (!response.ok) {
        throw new Error('Failed to fetch yearly report');
      }
      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch yearly report');
    }
  }
};