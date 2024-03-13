import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Header';
import { collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  increment, 
  arrayUnion,
  getDoc,
  setDoc } from 'firebase/firestore';
import { db, auth } from './config/firebase';

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


  const handleSaveWorkout = async (workoutId) => {
    if (!auth.currentUser) {
      console.error("No user signed in!");
      return;
    }
    const userRef = doc(db, 'users', auth.currentUser.uid);

    try {
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        // If the user document does not exist, create it with the workoutId in savedWorkouts
        await setDoc(userRef, {
          savedWorkouts: [workoutId],
        });
        console.log(`User document created and workout ${workoutId} saved.`);
      } else {
        // If the user document exists, update it by adding the workoutId to savedWorkouts
        await updateDoc(userRef, {
          savedWorkouts: arrayUnion(workoutId),
        });
        console.log(`Workout ${workoutId} saved successfully.`);
      }
      navigate('/my-workouts'); // Navigate to the My Workouts page after saving
    } catch (err) {
      console.error("Error saving workout:", err);
    }
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
            <button onClick={() => handleSaveWorkout(workout.id)}>Save Workout</button>
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
