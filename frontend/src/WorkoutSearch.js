import React, { useState, useEffect } from 'react';

const WorkoutSearch = () => {
  const [workouts, setWorkouts] = useState([]); // State to hold fetched workouts
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [durationFilter, setDurationFilter] = useState(''); // State for duration filter
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter

  useEffect(() => {
    // Simulate fetching workout data from an API endpoint
    const fetchWorkouts = async () => {
      try {
        // Mock API call or fetch static data
        const response = await fetch('example.com/workouts');
        const data = await response.json();
        setWorkouts(data); // Set fetched workouts to state
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts(); // Fetch workouts when component mounts
  }, []);

  // Filter workouts based on search term, duration, and category
  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearchTerm = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = !durationFilter || workout.duration === durationFilter;
    const matchesCategory = !categoryFilter || workout.category === categoryFilter;
    return matchesSearchTerm && matchesDuration && matchesCategory;
  });

  return (
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
        {/* Add more categories as needed */}
      </select>
      <ul>
        {filteredWorkouts.map(workout => (
          <li key={workout.id}>
            <p>Name: {workout.name}</p>
            <p>Duration: {workout.duration} minutes</p>
            <p>Category: {workout.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutSearch;
