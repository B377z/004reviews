import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/users.js';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Navigation hook to redirect user upon successful login
  const navigate = useNavigate();
  const [, setToken] = useAuth(); // Use setToken to store the login token

  // useMutation hook for handling login requests
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      // Set the token from the response and navigate to the homepage
      setToken(data.token);
      localStorage.setItem('token', data.token); // Optional: persist the token in localStorage
      navigate('/');
    },
    onError: () => {
      // Handle login error
      setErrorMessage('Failed to log in!'); // Set error message in state
    },
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the login mutation
    loginMutation.mutate();
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <Link to='/'>Back to main page</Link>
        <hr />
        <br />
        <div>
          <label htmlFor="login-username">Username:</label>
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <input
          type="submit"
          value={loginMutation.isLoading ? 'Logging in...' : 'Login'}
          disabled={!username || !password || loginMutation.isLoading}
        />
      </form>
      <p>Don&apos;t have an account? <Link to='/signup'>Sign up here</Link></p>
    </div>
  );
}

export default Login;
