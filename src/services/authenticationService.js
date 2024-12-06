// src/services/auth.service.js
const API_URL = "http://localhost:8081/api/v1/auth";

export const authenticationService = {
  isAuthenticated() {
    const csrfToken = localStorage.getItem("csrfToken");
    const csrfTokenExpiredTime = localStorage.getItem("csrfTokenExpiredTime");

    if (!csrfToken || !csrfTokenExpiredTime) {
      return false;
    }
    
    // Check if token is expired
    const now = new Date().getTime();
    return now < parseInt(csrfTokenExpiredTime);
  },

  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Login failed");
      }

      const data = await response.json();
      
      // Store tokens and expiration
      localStorage.setItem("csrfToken", data.csrfToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("tokenType", data.type);
      // Set expiration time in milliseconds
      const expirationTime = new Date().getTime() + (data.csrfTokenDuration);
      localStorage.setItem("csrfTokenExpiredTime", expirationTime.toString()*1000);

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // async refreshToken() {
  //   try {
  //     const refreshToken = localStorage.getItem("refreshToken");
  //     if (!refreshToken) {
  //       throw new Error("No refresh token available");
  //     }

  //     const response = await fetch(`${API_URL}/refresh`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json"
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ refreshToken })
  //     });

  //     if (!response.ok) {
  //       throw new Error("Token refresh failed");
  //     }

  //     const data = await response.json();
  //     localStorage.setItem("csrfToken", data.csrfToken);
  //     localStorage.setItem("csrfTokenExpiredTime", data.csrfTokenDuration);

  //     return data;
  //   } catch (error) {
  //     this.logout();
  //     throw error;
  //   }
  // },

  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Registration failed");
    }

    return response;
  },

  logout() {
    localStorage.clear();
    // Optional: Call logout endpoint to invalidate server-side session
  },
};