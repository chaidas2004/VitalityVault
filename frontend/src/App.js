import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import WorkoutLog from './WorkoutLog';
import WorkoutSearch from './WorkoutSearch';
import MyWorkouts from './MyWorkouts'; // Import MyWorkouts component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<WorkoutLog />} />
          <Route path="/explore" element={<WorkoutSearch />} />
          <Route path="/my-workouts" element={<MyWorkouts />} /> {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
