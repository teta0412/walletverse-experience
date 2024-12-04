const API_URL = "http://localhost:8080/api/v1/auth";

export const authenticationService = {
  isAuthenticated() {
    const csrfToken = localStorage.getItem('csrfToken');
    const csrfTokenExpiredTime = localStorage.getItem('csrfTokenExpiredTime');
    
    if (!csrfToken || !csrfTokenExpiredTime) {
      return false;
    }

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
    localStorage.setItem('csrfToken', data.csrfToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('tokenType', data.type);
    localStorage.setItem('csrfTokenExpiredTime', data.csrfTokenExpiredTime);
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    
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
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response;
  },

  logout() {
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('csrfTokenExpiredTime');
    localStorage.removeItem('userInfo');
  }
};