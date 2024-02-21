import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header>
        <h1>VitalityVault</h1>
        <div className="nav-wrapper">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/explore">Explore Workouts</Link>
            <Link to="/my-workouts">My Workouts</Link>
            <Link to="/create">Create Workout</Link>
          </nav>
          <div className="login-button">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
      </div>
    </div>
  );
};

export default Dashboard;
