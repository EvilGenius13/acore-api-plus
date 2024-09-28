import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define Player type
interface Player {
  guid: number;
  name: string;
  race: number;
  class: number;
  gender: number; // 0 = male, 1 = female
  level: number;
}

// Assuming API_URL is defined elsewhere
const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3001/api';

// Class Info: Mapping class IDs to class names and colors
const classInfo: { [key: number]: { name: string; color: string } } = {
  1: { name: 'Warrior', color: '#C69B6D' },
  2: { name: 'Paladin', color: '#F48CBA' },
  3: { name: 'Hunter', color: '#AAD372' },
  4: { name: 'Rogue', color: '#FFF468' },
  5: { name: 'Priest', color: '#FFFFFF' },
  6: { name: 'Death Knight', color: '#C41E3A' },
  7: { name: 'Shaman', color: '#0070DD' },
  8: { name: 'Mage', color: '#3FC7EB' },
  9: { name: 'Warlock', color: '#8788EE' },
  11: { name: 'Druid', color: '#FF7C0A' },
};

// Race-to-Faction Mapping
const raceFactionMap: { [key: number]: string } = {
  1: 'Alliance',  // Human
  3: 'Alliance',  // Dwarf
  4: 'Alliance',  // Night Elf
  7: 'Alliance', // Gnome
  11: 'Alliance', // Draenei
  2: 'Horde',     // Orc
  5: 'Horde',    // Undead
  6: 'Horde',    // Tauren
  8: 'Horde',   // Troll
  10: 'Horde',   // Blood Elf
};

// Race Info (Map race IDs to names)
const raceInfo: { [key: number]: string } = {
  1: 'human',
  2: 'orc',
  3: 'dwarf',
  4: 'nightelf',
  5: 'undead',
  6: 'tauren',
  7: 'gnome',
  8: 'troll',
  10: 'bloodelf',
  11: 'draenei',
};

// Gender Mapping
const genderInfo: { [key: number]: string } = {
  0: 'male',   // 0 is male
  1: 'female', // 1 is female
};

// Faction Image Paths
const factionImages: { [key: string]: string } = {
  'Alliance': '/assets/factions/alliance.jpg',
  'Horde': '/assets/factions/horde.jpg',
};

// Helper function to get the race/gender image path
const getRaceGenderImage = (race: number, gender: number): string => {
  const raceName = raceInfo[race] || 'unknown';
  const genderName = genderInfo[gender] || 'unknown';
  return `/assets/races/achievement_character_${raceName}_${genderName}.jpg`;
};

// Helper function to get the class image path
const getClassImage = (classId: number): string => {
  const className = classInfo[classId]?.name.toLowerCase() || 'unknown';
  return `/assets/classes/classicon_${className}.jpg`;
};

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]); // Explicitly typed as Player array

  // Fetch players from API
  useEffect(() => {
    axios
      .get(`${API_URL}/players`)
      .then((response) => {
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
          {players.map((player: Player, index: number) => {
            const playerClass = classInfo[player.class] || { name: 'Unknown', color: '#FFFFFF' };
            const playerFaction = raceFactionMap[player.race] || 'Unknown';
            const playerRace = raceInfo[player.race] || 'Unknown';
            const raceGenderImage = getRaceGenderImage(player.race, player.gender);
            const classImage = getClassImage(player.class);

            return (
              <tr key={player.guid} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={{ ...tdStyle, color: playerClass.color }}>{player.name}</td>
                <td style={tdStyle}>{player.level}</td>
                <td style={tdStyle}>
                  <img
                    src={factionImages[playerFaction]}
                    alt={playerFaction}
                    style={factionIconStyle}
                  />
                </td>
                <td style={tdStyle}>
                  {/* Race/Gender Image and Class Image */}
                  <div style={imageContainerStyle}>
                    <img src={raceGenderImage} alt={`${playerRace} ${genderInfo[player.gender]}`} style={raceGenderIconStyle} />
                    <img src={classImage} alt={playerClass.name} style={classIconStyle} />
                  </div>
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

const factionIconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  border: '2px solid grey',
};

const imageContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center', // Centering the images
  alignItems: 'center',
  gap: '10px', // Space between race/gender and class icons
};

const raceGenderIconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  border: '2px solid grey',
};

const classIconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  border: '2px solid #868585',
};

// Alternating row styles
const evenRowStyle: React.CSSProperties = {
  backgroundColor: '#0f0f0f', // Darker shade for even rows
};

const oddRowStyle: React.CSSProperties = {
  backgroundColor: '#353030', // Slightly lighter shade for odd rows
};

export default Players;
