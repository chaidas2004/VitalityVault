import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
// import {
//   doc,
//   getDoc
// } from 'firebase/firestore';
// import { auth, db } from './config/firebase.js'
// const userRef = doc(db, 'users', auth.currentUser)

const MyWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
    // let savedWorkoutsRefs = [];
    // getDoc(userRef).then((snapshot) => { // get a snapshot of the user's document
    //   snapshot.docs.forEach((doc) => { // loop through each doc in the snapshot in order to access docs (there is only one doc so only iterate once)
    //     doc.data.workouts.forEach((workout) => { // access the workouts field of the user's document and loop through it
    //       savedWorkoutsRefs.push(workout) // push each element (a reference to a workout document) to savedWorkoutRefs
    //     })
    //   })
    // }) 
    // let savedWorkouts = [];
    // savedWorkoutsRefs.forEach(workoutRef => { // loop through each workout reference in savedWorkoutRefs
    //   getDoc(workoutRef).then((snapshot) => { // get a snapshot of each workout doc
    //     snapshot.docs.forEach((doc) => { // loop through the docs in the snapshot in order to access docs
    //       savedWorkouts.push({...doc.data}) // push the data field into savedWorkouts
    //     })
    //   })
    // });
    // if (savedWorkouts) {
    //   setSavedWorkouts(savedWorkouts)
    
  }, []);

  return (
    <>
    <Dashboard />
    <div>
      <h2>My Workouts</h2> {}
      {savedWorkouts.length === 0 ? (
        <p>No workouts saved yet.</p>
      ) : (
        <div>
          {savedWorkouts.map((workout, index) => (
            <div key={index}>
              <h3>{workout.name}</h3>
              <p>Tag: {workout.tag}</p>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index}>
                    Exercise: {exercise.exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default MyWorkouts;