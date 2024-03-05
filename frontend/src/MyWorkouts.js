import React, { useEffect, useState } from 'react';

const MyWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
   
    const savedWorkoutsString = localStorage.getItem('workoutPlans'); 
    if (savedWorkoutsString) {
      const savedWorkoutsArray = JSON.parse(savedWorkoutsString);
      setSavedWorkouts(savedWorkoutsArray);
    }
  }, []);

  return (
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
  );
};

export default MyWorkouts;
