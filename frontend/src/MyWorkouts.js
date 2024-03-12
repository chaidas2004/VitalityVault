import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config/firebase';
import { useUser } from './AuthContext';
import Header from './Header';

const MyWorkouts = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!currentUser) return;
      const q = query(collection(db, 'workouts'), where('userId', '==', currentUser.uid));
      try {
        const querySnapshot = await getDocs(q);
        setSavedWorkouts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };
    fetchWorkouts();
  }, [currentUser]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const removeWorkout = async (workoutId) => {
    try {
      await deleteDoc(doc(db, "workouts", workoutId));
      setSavedWorkouts(savedWorkouts.filter(workout => workout.id !== workoutId));
    } catch (error) {
      console.error('Error removing workout:', error);
    }
  };

  return (
    <div>
      <Header />
      <button onClick={handleBack}>Back to HomePage</button>
      {savedWorkouts.length === 0 ? (
        <p>No workouts saved yet.</p>
      ) : (
        <div>
          {savedWorkouts.map((workout, index) => (
            <div key={index}>
              <h3>{workout.name || 'Unnamed Workout'}</h3>
              <p>Tag: {workout.tag}</p>
              <button onClick={() => removeWorkout(workout.id)}>Remove</button>
              <ul>
                {workout.exercises.map((exercise, idx) => (
                  <li key={`${workout.id}-${idx}`}>
                    Exercise: {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWorkouts;
