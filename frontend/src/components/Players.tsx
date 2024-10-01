// Players.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerRow from './PlayerRow';
import { Player } from '../types/types';
import { containerStyle, titleStyle, tableStyle, thStyle} from '../styles/styles';
import '../styles/main.css';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3005/api';

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const limit = 5; // Number of players per page

  const fetchPlayers = async (page: number) => {
    try {
      const response = await axios.get(`${API_URL}/players`, {
        params: { page, limit },
      });

      setPlayers(response.data.players);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers(page);
  }, [page]);

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Players</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Player</th>
            <th style={thStyle}>Level</th>
            <th style={thStyle}>Faction</th>
            <th style={thStyle}>Class</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <PlayerRow key={player.guid} player={player} index={index} />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button className="button" onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page} of {totalPages}
        </span>
        <button className="button" onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Players;