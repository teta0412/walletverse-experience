// userService.js
import { authenticationService } from './authenticationService';

const API_BASE_URL = 'http://localhost:8082/api/v1/users';

export const userService = {
  async getCurrentUser() {
    try {
      const csrfToken = localStorage.getItem('csrfToken');
      const tokenType = localStorage.getItem('tokenType');
      
      if (!csrfToken || !tokenType) {
        throw new Error('No authentication tokens found');
      }

      const response = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${tokenType} ${csrfToken}`
        },
        credentials: 'include'
      });

      if (response.status === 401) {
        // Token might be expired, try to refresh
        await authenticationService.refreshToken();
        // Retry the request with new token
        return this.getCurrentUser();
      }

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      localStorage.setItem('userId', data.id);
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  async updateUser(userData) {
    try {
      const csrfToken = localStorage.getItem('csrfToken');
      const tokenType = localStorage.getItem('tokenType');

      const response = await fetch(`${API_BASE_URL}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${tokenType} ${csrfToken}`
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      // if (response.status === 401) {
      //   // Token might be expired, try to refresh
      //   await authenticationService.refreshToken();
      //   // Retry the request with new token
      //   return this.updateUser(userData);
      // }

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
};