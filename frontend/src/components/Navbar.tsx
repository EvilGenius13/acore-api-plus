import React from 'react';
import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

const Navbar = () => {
  return (
    <nav style={navStyle as CSSProperties}>
      {/* Left: World of Warcraft Logo */}
      <div style={logoContainerStyle}>
        <img src="/assets/world-of-warcraft-logo.png" alt="World of Warcraft" style={logoStyle} />
      </div>

      {/* Center: Navigation Links */}
      <ul style={ulStyle as CSSProperties}>
        <li style={liStyle as CSSProperties}>
          <Link to="/" style={linkStyle as CSSProperties}>Home</Link>
        </li>
        <li style={liStyle as CSSProperties}>
          <Link to="/about" style={linkStyle as CSSProperties}>About</Link>
        </li>
        <li style={liStyle as CSSProperties}>
          <Link to="/stats" style={linkStyle as CSSProperties}>Stats</Link>
        </li>
        <li style={liStyle as CSSProperties}>
          <Link to="/armory" style={linkStyle as CSSProperties}>Armory</Link>
        </li>
        <li style={liStyle as CSSProperties}>
          <Link to="/players" style={linkStyle as CSSProperties}>Players</Link>
        </li>
        <li style={liStyle as CSSProperties}>
          <Link to="/register" style={linkStyle as CSSProperties}>Register</Link>
        </li>
      </ul>

      {/* Right: Login Button */}
      <div style={loginButtonContainerStyle}>
        <button style={loginButtonStyle}>Login</button>
      </div>
    </nav>
  );
};

// Logo container (left side of the navbar)
const logoContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px',
};

// Logo image styling
const logoStyle: CSSProperties = {
  height: '50px', // Adjust based on your needs
};

// Navbar container style
const navStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#141414', // Dark background for the navbar
  borderBottom: '3px solid #ffe563', // Golden border at the bottom
  backgroundImage: 'linear-gradient(to right, #141414, #333333)', // Adds some depth with gradient
  borderRadius: '0 0 10px 10px', // Slight rounded corners at the bottom
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Add a shadow to give depth
};

// Center navigation links style
const ulStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem', // Space between links
  listStyleType: 'none',
  margin: '0',
  padding: '0',
};

// Each navigation item style
const liStyle: CSSProperties = {
  display: 'inline',
};

// Link styling (for WoW feel)
const linkStyle: CSSProperties = {
  color: '#ffe563', // Gold WoW-like color
  fontWeight: 'bold',
  fontSize: '18px',
  textDecoration: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  transition: 'background-color 0.3s, transform 0.3s',
  fontFamily: 'Georgia, serif', // Adds a medieval feel to the font
};

const loginButtonContainerStyle: CSSProperties = {
  marginRight: '20px',
};

// Login button styling (right side of the navbar)
const loginButtonStyle: CSSProperties = {
  backgroundColor: '#ffe563', // Gold button color
  color: '#141414', // Dark text for contrast
  border: 'none',
  borderRadius: '5px',
  padding: '8px 16px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
  fontFamily: 'Georgia, serif',
};

// Add hover effects for both links and button
const linkHoverStyle: CSSProperties = {
  backgroundColor: '#333333', // Darker on hover
  transform: 'scale(1.1)', // Slight scale effect
};

const loginButtonHoverStyle: CSSProperties = {
  backgroundColor: '#ffcf63', // Lighter gold on hover
  transform: 'scale(1.1)', // Slight scale effect
};

export default Navbar;
