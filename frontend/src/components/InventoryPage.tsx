import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3005/api';

const InventoryPage = () => {
  const { guid } = useParams<{ guid: string }>();
  const [inventory, setInventory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setErrorMessage('No token found. Please log in.');
          return;
        }

        const response = await axios.get(`${API_URL}/inventory/${guid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInventory(response.data.inventory);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    };

    fetchInventory();
  }, [guid]);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Character Inventory</h1>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      <ul>
        {inventory.map((item: any) => (
          <li key={item.item_guid}>
            Item ID: {item.item}, Slot: {item.slot}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const containerStyle = {
  // ... your styles
};

const headerStyle = {
  // ... your styles
};

const errorStyle = {
  // ... your styles
};

export default InventoryPage;
