// src/services/auth.service.js
const API_URL = "http://localhost:8081/api/v1/auth";

export const authenticationService = {
  isAuthenticated() {
    const csrfToken = localStorage.getItem('csrfToken');
    return csrfToken !== null;
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    localStorage.setItem('userId', data.user_id)
    localStorage.setItem('email', data.email)

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
    localStorage.removeItem('userId', data.user_id)
    localStorage.removeItem('email', data.email)
  },
};