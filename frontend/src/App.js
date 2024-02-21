import React from 'react';
import './App.css';
import './Dashboard.css';
import Login from './Login';




function App() {
return (
  <div className="App">
    <header className="App-header">
      <h1>VitalityVault</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#explore-workouts">Explore Workouts</a>
        <a href="#my-workouts">My Workouts</a>
        <a href="#create-workouts">Create Workouts</a>
        <Login /> {/* Include the Login component here */}
      </nav>
    </header>
    <div className="content">
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
    </div>
  </div>
);
}




export default App;






