import React, { useEffect, useState } from 'react';
import {
   collection,
   query,
   where,
   getDocs
} from 'firebase/firestore';
import { db } from './config/firebase'
import { useUser } from './AuthContext'
import Header from './Header'

const MyWorkouts = () => {
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

  return (
    <div>
      <Header/>
      <h2>My Workouts</h2> {}
      {savedWorkouts.length === 0 ? (
        <p>No workouts saved yet.</p>
      ) : (
        <div>
          {savedWorkouts.map((workout, index) => (
            <div key={index}>
              <h3>{workout.name || 'Unnamed Workout'}</h3>
              <p>Tag: {workout.tag}</p>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={workout.id}>
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
