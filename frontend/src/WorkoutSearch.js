import React, { useState } from 'react';
import { db } from './config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const WorkoutSearch = () => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');

  const handleSearch = async () => {
    let q = query(collection(db, "workouts"));

    if (name !== '') {
      q = query(q, where("name", "==", name));
    }
    if (tags !== '') {
      q = query(q, where("tags", "==", tags));
    }

    const querySnapshot = await getDocs(q);
    const filteredWorkouts = [];
    querySnapshot.forEach((doc) => {
      filteredWorkouts.push({ id: doc.id, ...doc.data() });
    });
    setWorkouts(filteredWorkouts);
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
          {workouts.map((workout) => (
            <div key={workout.id}>
              <p>Name: {workout.name}, , Tags: {workout.tags}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WorkoutSearch;