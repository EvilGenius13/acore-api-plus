import React from 'react';
import {
  classInfo,
  raceFactionMap,
  raceInfo,
  genderInfo,
  factionImages,
  getRaceGenderImage,
  getClassImage,
} from '../utils/playerData';
import { Player } from '../types/types';

interface PlayerRowProps {
  player: Player;
  index: number;
  children?: React.ReactNode; // Accept children props
}

const PlayerRow: React.FC<PlayerRowProps> = ({ player, index, children }) => {
  const playerClass = classInfo[player.class] || { name: 'Unknown', color: '#FFFFFF' };
  const playerFaction = raceFactionMap[player.race] || 'Unknown';
  const playerRace = raceInfo[player.race] || 'Unknown';
  const raceGenderImage = getRaceGenderImage(player.race, player.gender);
  const classImage = getClassImage(player.class);

  // Alternating row styles
  const rowStyle: React.CSSProperties = index % 2 === 0 ? evenRowStyle : oddRowStyle;

  return (
    <tr style={rowStyle}>
      {[
        <td key="name" style={{ ...tdStyle, color: playerClass.color }}>{player.name}</td>,
        <td key="level" style={tdStyle}>{player.level}</td>,
        <td key="faction" style={tdStyle}>
          <img
            src={factionImages[playerFaction]}
            alt={playerFaction}
            style={factionIconStyle}
          />
        </td>,
        <td key="class" style={tdStyle}>
          <div style={imageContainerStyle}>
            <img
              src={raceGenderImage}
              alt={`${playerRace} ${genderInfo[player.gender]}`}
              style={raceGenderIconStyle}
            />
            <img src={classImage} alt={playerClass.name} style={classIconStyle} />
          </div>
        </td>,
        children // Render children directly without wrapping in <td>
      ]}
    </tr>
  );
};

// Styles (reuse or import from a styles module)
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
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
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

export default PlayerRow;
