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
  setDoc, 
  onSnapshot} from 'firebase/firestore';
import { db, auth } from './config/firebase';

const WorkoutSearch = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const navigate = useNavigate();

  const handleBackToHomepage = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      let q = query(collection(db, "workouts"), where("public", "==", true), where("likes", ">", 0));
      if (tagFilter) {
        q = query(q, where("tag", "==", tagFilter));
      }
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const workoutsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setWorkouts(workoutsData);
      });
      return () => unsubscribe();
    }
    fetchWorkouts()
  }, [tagFilter]);


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
    <div>
      <button className="back-button" onClick={handleBackToHomepage}>Back to Homepage</button>
      <h2>Workout Search and Filtering</h2>
      <input
        type="text"
        placeholder="Search workouts by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="Cardio">Cardio</option>
          <option value="strength training">Strength Training</option>
          <option value="full-body">Full-Body</option>
          <option value="arms">Arms</option>
          <option value="legs">Legs</option>
          <option value="back">Back</option>
          <option value="chest">Chest</option>
          <option value="shoulder">Shoulder</option>
          <option value="core">Core</option>
          <option value="yoga">Yoga</option>
        </select>
      <ul>
      {filteredWorkouts.length > 0 ? filteredWorkouts.map((workout) => (
          <li key={workout.id}>
            <p>Name: {workout.name}</p>
            <p>Tag: {workout.tag || workout.tags || 'No tag'}</p>
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
  );
};
  
export default WorkoutSearch;
