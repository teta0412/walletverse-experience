// userService.js
const API_BASE_URL = 'http://localhost:8082/api/v1/users';
const csrfToken = localStorage.getItem('csrfToken');
const tokenType = localStorage.getItem('tokenType');

export const userService = {
  async getCurrentUser() {
    // const userId = localStorage.getItem('userId');
    // if (!userId) {
    //   throw new Error('No user ID found');
    // }
    
    const response = await fetch(`${API_BASE_URL}/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${csrfToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    console.log(response)
    localStorage.setItem('userId',response.json.id)

    return response.json();
  },

  async updateUser(userData) {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${csrfToken}`
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    });
    console.log(response.text)
    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    return response.json();
  }
};