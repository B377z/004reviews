// src/api/users.js

// Define the API function for user signup
export async function signup({ username, email, password }) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const error = await response.json();
        throw new Error(error.message || 'Failed to sign up');
      }
  
      // Parse the response JSON
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error during signup:', error);
      throw error;
    }
  }

// Define the login function for user authentication
export const login = async ({ username, password }) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to log in');
  }

  const data = await res.json();
  return data; // This should typically contain the token and user data
};

export const getUserInfo = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await res.json()
}
  