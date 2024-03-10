import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import StopWatch from './StopWatch';
import Login from './Login'; 

const Dashboard = () => {
  const [showUserInformation, setShowUserInformation] = useState(false);

  const toggleUserInformation = () => {
    setShowUserInformation(prevState => !prevState);
  };

  const closeUserInformation = () => {
    setShowUserInformation(false);
  };

  return (
    <div className="dashboard">
      <header className="main-header">
        <h1 id="main-title">VitalityVault</h1>
        <div className="nav-wrapper">
          <nav>
            <Link to="/my-workouts">My Workouts</Link>
            <Link to="/explore">Explore Workouts</Link>
            <Link to="/create">Create Workout</Link>
          </nav>
        </div>
        <div className="login-button">
          <Login />
        </div>
      </header>

      <div className={`half-page ${showUserInformation ? 'slide-in' : 'slide-out'}`}>
        <div className="content">
          <h2>Workout Summary</h2>
          {}
          {}
          <button className="close-button" onClick={closeUserInformation}>Close</button>
        </div>
        <StopWatch />
      </div>
    </div>
  );
};

export default Dashboard;
