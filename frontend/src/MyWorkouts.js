import React, { useEffect, useState } from 'react';
import {
   collection,
   query,
   where,
   getDocs,
   doc,
   getDoc
} from 'firebase/firestore';
import { db } from './config/firebase'
import { useUser } from './AuthContext'
import Header from './Header'

const MyWorkouts = () => {
  const { currentUser } = useUser();
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!currentUser) return;

      const q = query(collection(db, 'workouts'), where('userId', '==', currentUser.uid));

      try {
        const querySnapshot = await getDocs(q);
        setUserWorkouts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    const fetchSavedWorkouts = async () => {
      console.log("Fetching saved workouts for user:", currentUser.uid);
      if (!currentUser) {
        console.error("No user found.");
        return;
      }
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist.");
        return;
      }
      const savedWorkoutIds = userDoc.data().savedWorkouts || [];
      console.log("Saved workout IDs:", savedWorkoutIds);
    
      const savedWorkoutsData = await Promise.all(
        savedWorkoutIds.map(async (workoutId) => {
          const workoutRef = doc(db, 'workouts', workoutId);
          const workoutSnap = await getDoc(workoutRef);
          if (workoutSnap.exists()) {
            console.log(`Fetched saved workout: ${workoutSnap.id}`);
            return { id: workoutSnap.id, ...workoutSnap.data() };
          } else {
            console.log(`Workout not found: ${workoutId}`);
            return null;
          }
        })
      );
    
      const filteredWorkouts = savedWorkoutsData.filter(workout => workout !== null);
      console.log("Filtered saved workouts:", filteredWorkouts);
      setSavedWorkouts(filteredWorkouts);
    };
  fetchWorkouts();
  fetchSavedWorkouts();
}, [currentUser]);

  return (
    <div>
      <Header/>
      <h2>My Workouts</h2><div>
    <h3>My Own Workouts</h3>
    {userWorkouts.length > 0 ? (
        userWorkouts.map((workout, index) => (
            <div key={index}>
                <h4>{workout.name || 'Unnamed Workout'}</h4>
                <p>Tag: {workout.tag}</p>
                <ul>
                    {workout.exercises.map((exercise, index) => (
                        <li key={workout.id}>
                            Exercise: {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%
                        </li>
                    ))}
                </ul>
            </div>
        ))
    ) : (
        <p>No workouts created.</p>
    )}
</div><div>
        <h3>Saved Workouts</h3>
        {savedWorkouts.length > 0 ? (
            savedWorkouts.map((workout, index) => (
                <div key={index}>
                    <h4>{workout.name || 'Unnamed Workout'}</h4>
                    <p>Tag: {workout.tag}</p>
                    <ul>
                        {workout.exercises.map((exercise, index) => (
                            <li key={`${workout.id}-${index}`}>
                                Exercise: {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%
                            </li>
                        ))}
                    </ul>
                </div>
            ))
        ) : (
            <p>No saved workouts found.</p>
        )}
    </div>
    </div>

  );
};

export default MyWorkouts;
