import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import WorkoutLog from './WorkoutLog';
import WorkoutSearch from './WorkoutSearch';
import MyWorkouts from './MyWorkouts'; // Import MyWorkouts component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/my-workouts" element={<MyWorkouts />} />
          <Route path="/create" element={<WorkoutLog />} />
          <Route path="/explore" element={<WorkoutSearch />} />
           {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
