import React, { useState } from 'react';
import { db } from './config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const WorkoutSearch = () => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSearch = async () => {
    let q = collection(db, "workouts");

    if (name === '' && tags === '') {
      q = query(q);
    } else {
      if (name !== '') {
        q = query(q, where("name", "==", name));
      }
      if (tags !== '') {
        q = query(q, where("tags", "==", tags));
      }
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setSearchError('No such workout');
      setWorkouts([]);
      return;
    }

    const filteredWorkouts = [];
    querySnapshot.forEach((doc) => {
      filteredWorkouts.push({ id: doc.id, ...doc.data() });
    });
    setWorkouts(filteredWorkouts);
    setSearchError('');
  };
  
  return (
    <div>
      <h1>Workout Search</h1>

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />

      <label htmlFor="tags">Tags:</label>
      <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} /><br /><br />        

      <button onClick={handleSearch}>Search</button>

      <div>
        {searchError && <p>{searchError}</p>}
        {workouts.map((workout) => (
          <div key={workout.id}>
            <p>Name: {workout.name}, Tags: {workout.tags}</p>
            <ul>
              {Array.isArray(workout.exercises) ? (
                workout.exercises.map((exercise, index) => (
                  <li key={index}>
                    Exercise: {exercise.name}, Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}
                  </li>
                ))
              ) : (
                <li>No exercises found</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
  
export default WorkoutSearch;