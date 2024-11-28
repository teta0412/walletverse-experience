// src/services/auth.service.js
const API_URL = "http://localhost:8080/api/v1/auth";

export const authenticationService = {
  isAuthenticated() {
    const csrfToken = localStorage.getItem('csrfToken');
    const csrfTokenExpiredTime = localStorage.getItem('csrfTokenExpiredTime');
    
    if (!csrfToken || !csrfTokenExpiredTime) {
      return false;
    }

    // Check if token is expired
    const expiryTime = new Date(csrfTokenExpiredTime);
    const currentTime = new Date();
    return currentTime < expiryTime;
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // Store tokens in localStorage
    localStorage.setItem('csrfToken', data.csrfToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('tokenType', data.type);
    localStorage.setItem('csrfTokenExpiredTime', data.csrfTokenExpiredTime);
    
    return data;
  },

  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (response.ok === false) {
      console.log("dmcode1", response.ok)
      throw new Error('Registration failed');
    }

    return await response;
  },

  logout() {
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('csrfTokenExpiredTime');
  }
};