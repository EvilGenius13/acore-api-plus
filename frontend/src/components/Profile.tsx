import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerRow from './PlayerRow';
import { Player } from '../types/types';
import { useNavigate } from 'react-router-dom';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3001/api';

const Profile = () => {
  const [characters, setCharacters] = useState<Player[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setErrorMessage('No token found. Please log in.');
          navigate('/login'); // Redirect to login
          return;
        }

        const response = await axios.get(`${API_URL}/characters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCharacters(response.data.characters);
      } catch (error: any) {
        console.error('Error fetching characters:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    };

    fetchCharacters();
  }, [navigate]);

  const handleCharacterClick = (guid: string) => {
    // Redirect to the inventory page for the selected character
    window.location.href = `/inventory/${guid}`;
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Your Characters</h1>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Player</th>
            <th style={thStyle}>Level</th>
            <th style={thStyle}>Faction</th>
            <th style={thStyle}>Class</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
  {characters.map((char, index) => (
    <PlayerRow key={char.guid} player={char} index={index}>
      <td style={tdStyle}>
        <button
          style={buttonStyle}
          onClick={() => handleCharacterClick(char.guid.toString())}
        >
          View Inventory
        </button>
      </td>
    </PlayerRow>
  ))}
</tbody>
      </table>
    </div>
  );
};

// Styles (reuse or import from a styles module)
const containerStyle = {
  padding: '20px',
  textAlign: 'center' as 'center',
};

const titleStyle = {
  color: 'white',
  fontSize: '24px',
  marginBottom: '20px',
};

const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  color: 'white',
};

const thStyle = {
  padding: '10px',
  borderBottom: '2px solid #ffe563',
};

const tdStyle = {
  padding: '10px',
};

const buttonStyle = {
  padding: '5px 10px',
  cursor: 'pointer',
};

export default Profile;