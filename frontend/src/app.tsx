import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stats from './components/Stats'; 
import Players from './components/Players';
import Register from './components/Register';
import '../public/stylesheets/style.css';

// Example Components for each route
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Armory = () => <h2>Armory Page</h2>;

function App() {
  return (
    <div style={{ backgroundColor: 'black', fontFamily: 'fantasy' }}>
    <Router>
      <div style={layoutStyle}>
        <Navbar />
        {/* Video Container */}
        <div style={videoContainerStyle}>
          <video autoPlay loop muted style={videoStyle}>
            <source src="/assets/mulgore.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Main Content Box */}
        <div style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/armory" element={<Armory />} />
            <Route path="/players" element={<Players />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  </div>
  );
}

export default App;

// CSS styles for layout
import { CSSProperties } from 'react';

const layoutStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  margin: '0', // Ensure no margin on the layout
  padding: '0',
  backgroundColor: 'black', // Ensures the background is black
};

// Video container styles (just positioned below the navbar)
const videoContainerStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px', // Space below the navbar
};

// Video styling to fit within the container
const videoStyle: CSSProperties = {
  maxWidth: '70%',
  height: 'auto',
  borderRadius: '8px',
  border: '2px solid #ffe563',
};

// Main content style - make it a narrow, longer box for content
const mainContentStyle: CSSProperties = {
  width: '50%', // Narrower content box
  marginTop: '-20px', // Space below the video
  backgroundColor: 'black', // Dark background for contrast
  color: 'white',
  padding: '50px',
  borderRadius: '10px',
  border: '2px solid #ffe563',
};
