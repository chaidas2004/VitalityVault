import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase'
import { useUser } from './AuthContext'
import './Dashboard.css';
import StopWatch from './StopWatch';
import Login from './Login'; 

const Dashboard = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [showUserInformation, setShowUserInformation] = useState(false);

  const toggleUserInformation = () => {
    setShowUserInformation(prevState => !prevState);
  };

  const closeUserInformation = () => {
    setShowUserInformation(false);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
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
          <div className="button-container">
            <p>Hello, {currentUser.displayName || "User"}</p>
            <button onClick={logOut}>Log Out</button>
            <redirect to="/" />
      </div>
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
