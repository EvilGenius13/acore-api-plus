import React, { useState } from 'react';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3001/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/loginunsafe`, {
        username,
        password,
      });

      const { token } = response.data;

      // Store the token (using localStorage for simplicity)
      localStorage.setItem('token', token);

      // Redirect to profile page or update the UI accordingly
      window.location.href = '/profile';
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Login</h1>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      <form onSubmit={(e) => e.preventDefault()} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            disabled={isLoading}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          style={buttonStyle}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : 'Login'}
        </button>
      </form>
    </div>
  );
};

// Styles (same as in Register.tsx)
const containerStyle = {
  backgroundColor: '#222',
  color: 'white',
  padding: '40px',
  borderRadius: '10px',
  width: '400px',
  margin: '0 auto',
};

const headerStyle = {
  textAlign: 'center' as 'center',
  marginBottom: '20px',
  color: '#ffe563',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  gap: '10px',
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
};

const labelStyle = {
  marginBottom: '5px',
  fontSize: '16px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  backgroundColor: '#333',
  color: 'white',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#ffe563',
  color: '#141414',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'center',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center' as 'center',
};

export default Login;
