import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Header';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore'; 

const WorkoutSearch = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 /* const [durationFilter, setDurationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');*/
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const q = query(collection(db, "workouts"), where("public", "==", true));
      const querySnapshot = await getDocs(q);
      const workoutsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWorkouts(workoutsData);
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

  const handleLikeWorkout = async (workoutId) => {
    console.log("Workout ID:", workoutId); 
    console.log("Type of Workout ID:", typeof workoutId); 

    const workoutIdStr = workoutId.toString();
    console.log("Converted Workout ID to String:", workoutIdStr); 

    const workoutRef = doc(db, 'workouts', workoutIdStr);
    await updateDoc(workoutRef, {
        likes: increment(1)
    }).then(() => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return { ...workout, likes: (workout.likes || 0) + 1 };
      } else {
        return workout;
      }
    }));
  });
};

  const filteredWorkouts = workouts.filter((workout) => 
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Dashboard />
    <div>
      <h2>Workout Search and Filtering</h2>
      <input
        type="text"
        placeholder="Search workouts by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
      {filteredWorkouts.length > 0 ? filteredWorkouts.map((workout) => (
          <li key={workout.id}>
            <p>Name: {workout.name}</p>
            <p>Tag: {workout.tags}</p>
            {workout.exercises.map((exercise, index) => (
                <div key={index}>
                  <p>Exercise: {exercise.name}</p>
                  <p>Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%</p>
                </div>
            ))}
            <button onClick={() => handleSaveWorkout(workout)}>Save Workout</button>
            <button onClick={() => handleLikeWorkout(workout.id)}>Like</button>
            <span>{workout.likes || 0} Likes</span>
            </li>
          )) : <p>No public workouts found.</p>}
      </ul>
    </div>
    </>
  );
};

export default WorkoutSearch;
