
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth hook


export function Header() {
  const [token, setToken] = useAuth();

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken); // Log the decoded token to check if `username` is there

      const { username } = decodedToken; // Extract the username from the decoded token

      return (
        <div>
          Logged in as <b>{username || 'Unknown User'}</b>
          <br />
          <button onClick={() => setToken(null)}>Logout</button>
        </div>
      );
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  return (
    <div>
      <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
}

