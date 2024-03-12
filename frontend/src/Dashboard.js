
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';
import { useUser } from './AuthContext';
import './Dashboard.css';
import StopWatch from './StopWatch';
import video from './video/VV.mp4';

const Dashboard = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();


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
          </div>
        </div>
      </header>

      <video src={video} width="100%" controls autoPlay loop />
      <StopWatch />
    </div>
  );
};

export default Dashboard;