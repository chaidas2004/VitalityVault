import React, { useState } from 'react';
import { db } from './config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const WorkoutSearch = () => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = async () => {
    let q = query(collection(db, "workouts"));

    if (name !== '') {
      q = query(q, where("name", "==", name));
    }
    if (duration !== '') {
      q = query(q, where("duration", "==", parseInt(duration)));
    }
    if (category !== '') {
      q = query(q, where("category", "==", category));
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
  
        <label htmlFor="duration">Duration:</label>
        <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="">Select Duration</option>
          <option value="5">5 Minutes</option>
          <option value="10">10 Minutes</option>
          <option value="20">20 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="45">45 Minutes</option>
          <option value="60">60 Minutes</option>
        </select><br /><br />
  
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
        </select><br /><br />
        <button onClick={handleSearch}>Search</button>
        <div>
          {workouts.map((workout) => (
            <div key={workout.id}>
              <p>Name: {workout.name}, Duration: {workout.duration} minutes, Category: {workout.category}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WorkoutSearch;