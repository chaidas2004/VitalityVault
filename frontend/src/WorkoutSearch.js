import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
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
  const [tagFilter, setTagFilter] = useState('');
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const navigate = useNavigate();

  const handleBackToHomepage = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      let q = query(collection(db, "workouts"), where("public", "==", true));
      if (tagFilter) {
        q = query(collection(db, "workouts"), where("public", "==", true), where("tag", "==", tagFilter));
      }
      const querySnapshot = await getDocs(q);
      const workoutsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          isLiked: data.likers?.includes(auth.currentUser?.uid) 
        };
      });
      setWorkouts(workoutsData);
    };
    fetchWorkouts();
  }, [tagFilter]);

  const handleSaveWorkout = async (workoutId) => {
    if (!auth.currentUser) {
      console.error("No user signed in!");
      return;
    }
    try {
      const workoutRef = doc(db, "workouts", workoutId);
      await updateDoc(workoutRef, {
        saverID: arrayUnion(auth.currentUser.uid)
      });
      console.log(`Workout ${workoutId} saved successfully.`);
      navigate('/my-workouts'); 
    } catch (err) {
      console.error("Error saving workout:", err);
    }
  };

  const handleLikeWorkout = async (workoutId) => {
    if (!auth.currentUser) {
      console.error("No user signed in!");
      return;
    }
    const workoutRef = doc(db, 'workouts', workoutId);
    const workoutDoc = await getDoc(workoutRef);
    if (workoutDoc.exists()) {
      const likers = workoutDoc.data().likers || [];
      if (likers.includes(auth.currentUser.uid)) {
        console.log("User already liked this workout!");
        return;
      }
      try {
        await updateDoc(workoutRef, {
          likers: arrayUnion(auth.currentUser.uid),
          likes: increment(1)
        });
        console.log("Workout liked successfully.");
        setWorkouts(currentWorkouts =>
          currentWorkouts.map(workout =>
            workout.id === workoutId
              ? { ...workout, isLiked: true, likes: (workout.likes || 0) + 1 }
              : workout
          )
        );
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      console.error("Workout document not found!");
    }
  };


  const filteredWorkouts = workouts.filter((workout) => 
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header/>
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
            <button onClick={() => handleLikeWorkout(workout.id)}>
            {workout.isLiked ? 'Liked' : 'Like'}
            </button>
            <span>{workout.likes || 0} Likes</span>
            </li>
          )) : <p>No public workouts found.</p>}
      </ul>
    </div>
  );
};
  
export default WorkoutSearch;
