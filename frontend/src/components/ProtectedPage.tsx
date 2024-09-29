import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3001/api';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setErrorMessage('No token found. Please log in.');
          return;
        }

        const response = await axios.get(`${API_URL}/protected/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(response.data.message);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Protected Page</h1>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

// Styles
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

const errorStyle = {
  color: 'red',
  textAlign: 'center' as 'center',
};

const messageStyle = {
  color: 'green',
  textAlign: 'center' as 'center',
};

export default ProtectedPage;
