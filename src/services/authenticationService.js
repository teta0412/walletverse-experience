const API_URL = "http://localhost:8081/api/v1/auth";

export const authenticationService = {
  async setup(data) {
    return new Promise((resolve) => {
      // Store tokens and expiration
      localStorage.setItem("csrfToken", data.csrfToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("tokenType", data.type);
      const expirationTime = new Date().getTime() + (data.csrfTokenDuration * 1000);
      localStorage.setItem("csrfTokenExpiredTime", expirationTime.toString());
      resolve();
    });
  },

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
      console.log('Attempting login...');
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      console.log('Login successful, setting up auth data...');
      await this.setup(data);
      
      // Verify setup
      const isAuth = this.isAuthenticated();
      console.log('Auth setup complete, authenticated:', isAuth);
      
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
    const data = await response.json();
    localStorage.setItem("email", data.email);
    localStorage.setItem("transactionId", data.transactionId);
    localStorage.setItem("otpDuration", data.duration);
    return data;
  },

  async verifyOTP(email, otp) {
    const transactionId = localStorage.getItem("transactionId");
    if (!transactionId) {
      throw new Error("No transaction id for otp available");
    }
    const response = await fetch(`${API_URL}/register/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, otp, transactionId }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "OTP verification failed");
    }

    return response.json();
  },

  async resendOTP(email) {
    const response = await fetch(`${API_URL}/new-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to resend OTP");
    }

    return response.json();
  },

  logout() {
    localStorage.clear();
  },
};