import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Assuming API_URL is defined elsewhere
const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3001/api';

// Class Info: Mapping class IDs to class names and colors
const classInfo = {
  1: { name: 'Warrior', color: '#C69B6D' },
  2: { name: 'Paladin', color: '#F48CBA' },
  4: { name: 'Hunter', color: '#AAD372' },
  8: { name: 'Rogue', color: '#FFF468' },
  16: { name: 'Priest', color: '#FFFFFF' },
  32: { name: 'Death Knight', color: '#C41E3A' },
  64: { name: 'Shaman', color: '#0070DD' },
  128: { name: 'Mage', color: '#3FC7EB' },
  256: { name: 'Warlock', color: '#8788EE' },
  1024: { name: 'Druid', color: '#FF7C0A' },
};

// Race-to-Faction Mapping
const raceFactionMap = {
  1: 'Alliance',  // Human
  4: 'Alliance',  // Dwarf
  8: 'Alliance',  // Night Elf
  64: 'Alliance', // Gnome
  1024: 'Alliance', // Draenei
  2: 'Horde',     // Orc
  16: 'Horde',    // Undead
  32: 'Horde',    // Tauren
  128: 'Horde',   // Troll
  512: 'Horde',   // Blood Elf
};

// Race Info (Map race IDs to names)
const raceInfo = {
  1: 'Human',
  2: 'Orc',
  4: 'Dwarf',
  8: 'Night Elf',
  16: 'Undead',
  32: 'Tauren',
  64: 'Gnome',
  128: 'Troll',
  256: 'Goblin',
  512: 'Blood Elf',
  1024: 'Draenei',
};

const Players = () => {
  const [players, setPlayers] = useState([]);

  // Fetch players from API
  useEffect(() => {
    axios
      .get(`${API_URL}/players`)
      .then((response) => {
        console.log(`WERE HERE ${response.data}`);
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
      });
  }, []);

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
          {players.map((player: any) => {
            const playerClass = classInfo[player.class] || { name: 'Unknown', color: '#FFFFFF' };
            const playerFaction = raceFactionMap[player.race] || 'Unknown';
            const playerRace = raceInfo[player.race] || 'Unknown';

            return (
              <tr key={player.guid}>
                <td style={{ ...tdStyle, color: playerClass.color }}>{player.name}</td>
                <td style={tdStyle}>{player.level}</td>
                <td style={tdStyle}>{playerFaction}</td>
                <td style={tdStyle}>
                  <span>{playerClass.name}</span> ({playerRace})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
  textAlign: 'center' as 'center',
};

const titleStyle = {
  color: 'white',
  fontSize: '24px',
  marginBottom: '20px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse' as 'collapse',
  color: 'white',
};

const thStyle = {
  padding: '10px',
  borderBottom: '2px solid #ffe563',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
};

export default Players;
