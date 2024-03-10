import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const WorkoutSearch = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {//sample static workouts till back end is implemented
    const fetchWorkouts = async () => {
      const staticWorkouts = [
        { id: 1, name: 'Leg Day', duration: 60, category: 'Strength' },
        { id: 2, name: 'HIIT Cardio', duration: 45, category: 'Cardio' },
        { id: 3, name: 'Upper Body Strength', duration: 50, category: 'Strength' },
      ];
      setWorkouts(staticWorkouts);
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    const savedWorkoutsString = localStorage.getItem('savedWorkouts');
    if (savedWorkoutsString) {
      const savedWorkoutsArray = JSON.parse(savedWorkoutsString);
      setSavedWorkouts(savedWorkoutsArray);
    }
  }, []);

  const handleSaveWorkout = (workout) => {
    const updatedSavedWorkouts = [...savedWorkouts, workout];
    localStorage.setItem('savedWorkouts', JSON.stringify(updatedSavedWorkouts));
    setSavedWorkouts(updatedSavedWorkouts);
    navigate('/my-workouts');
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearchTerm = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = !durationFilter || workout.duration === parseInt(durationFilter);
    const matchesCategory = !categoryFilter || workout.category === categoryFilter;
    return matchesSearchTerm && matchesDuration && matchesCategory;
  });

  return (
    <>
    <Dashboard />
    <div>
      <h2>Workout Search and Filtering</h2>
      <input
        type="text"
        placeholder="Search workouts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)}>
        <option value="">All Durations</option>
        <option value="30">30 minutes</option>
        <option value="45">45 minutes</option>
        <option value="60">60 minutes</option>
      </select>
      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
      </select>
      <ul>
        {filteredWorkouts.map((workout) => (
          <li key={workout.id}>
            <p>Name: {workout.name}</p>
            <p>Duration: {workout.duration} minutes</p>
            <p>Category: {workout.category}</p>
            <button onClick={() => handleSaveWorkout(workout)}>Save Workout</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default WorkoutSearch;
