import React, { useEffect, useState } from 'react';
import axios from 'axios';

// TODO: I don't like this any type, but I'm not sure how to fix it
const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3001/api';
const REALM = (import.meta as any).env.VITE_REALM || 'Realm';

// Utility to check if cached data is valid (not older than 10 minutes)
const isCacheValid = (timestamp: number) => {
  const TEN_MINUTES = 10 * 60 * 1000;
  const now = new Date().getTime();
  return now - timestamp < TEN_MINUTES;
};

// Utility to store data in localStorage with a timestamp
const setCache = (key: string, data: any) => {
  const cacheData = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

// Utility to get cached data if valid
const getCache = (key: string) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  return isCacheValid(timestamp) ? data : null;
};

const Stats = () => {
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [factionData, setFactionData] = useState<{ alliance: number; horde: number } | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' }));

  // Fetch the online players
  useEffect(() => {
    const cachedOnlinePlayers = getCache('onlinePlayers');
    if (cachedOnlinePlayers) {
      setOnlinePlayers(cachedOnlinePlayers);
    } else {
      axios
        .get(`${API_URL}/players/online/count`)
        .then((response) => {
          const onlineCount = response.data['onlineCount'];
          setOnlinePlayers(onlineCount);
          setCache('onlinePlayers', onlineCount);
        })
        .catch((error) => {
          console.error('Error fetching online players:', error);
        });
    }
  }, []);

  // Fetch the faction balance
  useEffect(() => {
    const cachedFactionData = getCache('factionData');
    if (cachedFactionData) {
      setFactionData(cachedFactionData);
    } else {
      axios
        .get(`${API_URL}/players/factioncount`)
        .then((response) => {
          const data = response.data[0]; // Assuming the response is an array with one object
          const factionData = {
            alliance: parseInt(data.alliance),
            horde: parseInt(data.horde),
          };
          setFactionData(factionData);
          setCache('factionData', factionData);
        })
        .catch((error) => {
          console.error('Error fetching faction data:', error);
        });
    }
  }, []);

  // Calculate the faction percentages
  const getFactionPercentages = () => {
    if (!factionData) return { alliancePercent: 50, hordePercent: 50 };
    const total = factionData.alliance + factionData.horde;
    const alliancePercent = (factionData.alliance / total) * 100;
    const hordePercent = (factionData.horde / total) * 100;
    return { alliancePercent, hordePercent };
  };

  const { alliancePercent, hordePercent } = getFactionPercentages();

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' }));
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div style={containerStyle}>
      {/* Header with Statistics and Current Time */}
      <div style={headerStyle}>
        <h1 style={headerTitleStyle}>Statistics</h1>
        <h2 style={headerTimeStyle}>{currentTime} EST</h2>
      </div>

      {/* Line Break */}
      <hr style={lineBreakStyle} />

      {/* Realm Box */}
      <div style={realmBoxStyle}>
        <h3 style={realmTitleStyle}>{REALM}</h3>
        <h5>Faction Balance</h5>
        <div style={factionLogoContainerStyle}>
          <img src="/assets/factions/alliance.jpg" alt="Alliance" style={logoStyle} />
          <img src="/assets/factions/horde.jpg" alt="Horde" style={logoStyle} />
        </div>

        {/* Faction Balance Bar */}
        <div style={factionBarStyle}>
          <div style={{ ...factionSideStyle, backgroundColor: 'blue', width: `${alliancePercent}%` }}>
            <span style={factionPercentTextStyle}>{Math.round(alliancePercent)}%</span>
          </div>
          <div style={{ ...factionSideStyle, backgroundColor: 'red', width: `${hordePercent}%` }}>
            <span style={factionPercentTextStyle}>{Math.round(hordePercent)}%</span>
          </div>
        </div>

        {/* Online Players */}
        <div style={onlinePlayersContainerStyle}>
          <h4>Online Players: {onlinePlayers !== null ? onlinePlayers : 'Loading...'}</h4>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const headerTitleStyle = {
  color: 'white',
  fontSize: '24px',
};

const headerTimeStyle = {
  color: 'white',
  fontSize: '18px',
};

const lineBreakStyle = {
  border: '1px solid #ffe563',
  margin: '20px 0',
};

import { CSSProperties } from 'react';

const realmBoxStyle: CSSProperties = {
  backgroundColor: '#222',
  color: 'white',
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #ffe563',
  textAlign: 'center' as 'center',
};

const realmTitleStyle = {
  marginBottom: '10px',
};

const factionLogoContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const logoStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50px',
};

const factionBarStyle = {
  display: 'flex',
  width: '100%',
  height: '30px',
  borderRadius: '8px',
  overflow: 'hidden',
  margin: '10px 0',
};

const factionSideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  color: 'white',
  fontWeight: 'bold',
};

const factionPercentTextStyle = {
  fontSize: '14px',
};

const onlinePlayersContainerStyle = {
  marginTop: '20px',
  color: 'white',
  fontSize: '18px',
};

export default Stats;
