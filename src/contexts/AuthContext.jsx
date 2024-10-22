import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create AuthContext with default values
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

// AuthContextProvider component to provide AuthContext to children
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Use `node` to support multiple children elements
};

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  const { token, setToken } = context;
  return [token, setToken];
}
