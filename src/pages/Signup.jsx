import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/users.js';

export function Signup() {
  // State for username, email, and password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Navigation hook to redirect user upon successful signup
  const navigate = useNavigate();

  // useMutation hook for handling signup requests
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, email, password }),
    onSuccess: () => {
      // On successful signup, navigate to login page
      navigate('/login');
    },
    onError: () => {
      // Handle signup error
      setErrorMessage('Failed to sign up!'); // Set error message in state
    },
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the signup mutation
    signupMutation.mutate();
  };

  return (
    <div>
      <h2>Signup</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <Link to='/'>Back to main page</Link>
        <hr />
        <br />
        <div>
          <label htmlFor="create-username">Username:</label>
          <input
            id="create-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="create-email">Email:</label>
          <input
            id="create-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="create-password">Password:</label>
          <input
            id="create-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <input
          type="submit"
          value={signupMutation.isLoading ? 'Signing up...' : 'Sign Up'}
          disabled={!username || !email || !password || signupMutation.isLoading}
        />
      </form>
    </div>
  );
}
