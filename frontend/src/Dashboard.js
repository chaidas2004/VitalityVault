import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { signInWithGooglePopup } from './Login'; 

const Dashboard = () => {
  
  const handleLogin = async () => {
    try {
      await signInWithGooglePopup(); // Call signInWithGooglePopup function on the login button click
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>VitalityVault</h1>
        <div className="nav-wrapper">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/explore">Explore Workouts</Link> {}
            <Link to="/my-workouts">My Workouts</Link>
            <Link to="/create">Create Workout</Link>
          </nav>
          <div className="login-button">
            <button onClick={handleLogin}>Login</button> {}
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
