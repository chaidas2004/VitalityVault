import React, { useState } from 'react';

// Sample exercise library data
const exerciseLibrary = [
  { name: 'Squats', description: 'A compound exercise that targets the muscles of the lower body.', sets: 3, reps: 10 },
  { name: 'Push-ups', description: 'A bodyweight exercise that targets the muscles of the chest, shoulders, and arms.', sets: 3, reps: 12 },
  { name: 'Deadlifts', description: 'A compound exercise that targets the muscles of the lower back, hamstrings, and glutes.', sets: 3, reps: 8 },
  // Add more exercises as needed
];

const WorkoutLog = () => {
  const [workoutPlan, setWorkoutPlan] = useState({
    name: '',
    tag: '',
    exercises: []
  });
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exerciseDetails, setExerciseDetails] = useState({
    name: '',
    description: '',
    sets: 0,
    reps: 0
  });
  const [intensity, setIntensity] = useState(100); // Default intensity to 100%
  const [validationError, setValidationError] = useState('');

  const handleAddExercise = () => {
    if (!selectedExercise) {
      setValidationError('Please select an exercise from the library.');
      return;
    }

    setWorkoutPlan({
      ...workoutPlan,
      exercises: [
        ...workoutPlan.exercises,
        {
          exercise: selectedExercise,
          sets: exerciseDetails.sets,
          reps: exerciseDetails.reps,
          intensity: intensity // Include intensity in exercise details
        }
      ]
    });

    // Reset exercise details
    setSelectedExercise('');
    setExerciseDetails({ name: '', description: '', sets: 0, reps: 0 });
    setIntensity(100); // Reset intensity
    setValidationError('');
  };

  const handleRemoveExercise = (indexToRemove) => {
    const updatedExercises = workoutPlan.exercises.filter((_, index) => index !== indexToRemove);
    setWorkoutPlan({ ...workoutPlan, exercises: updatedExercises });
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setExerciseDetails({ ...exercise });
  };

  return (
    <div>
      <h2>Workout Plan Logging</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name">Workout Plan Name:</label>
          <input
            type="text"
            id="name"
            value={workoutPlan.name}
            onChange={(e) => setWorkoutPlan({ ...workoutPlan, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="tag">Muscle Group Tag:</label>
          <input
            type="text"
            id="tag"
            value={workoutPlan.tag}
            onChange={(e) => setWorkoutPlan({ ...workoutPlan, tag: e.target.value })}
            required
          />
        </div>

        <h3>Add Exercise</h3>

        <div>
          <label htmlFor="exercise">Select Exercise:</label>
          <select
            id="exercise"
            value={selectedExercise}
            onChange={(e) => handleExerciseSelect(JSON.parse(e.target.value))}
          >
            <option value="">Select an exercise</option>
            {exerciseLibrary.map((exercise, index) => (
              <option key={index} value={JSON.stringify(exercise)}>{exercise.name}</option>
            ))}
          </select>
        </div>

        <div>
          <p>Exercise Description: {exerciseDetails.description}</p>
          <label htmlFor="sets">Sets:</label>
          <input
            type="number"
            id="sets"
            value={exerciseDetails.sets}
            onChange={(e) => setExerciseDetails({ ...exerciseDetails, sets: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <label htmlFor="reps">Reps:</label>
          <input
            type="number"
            id="reps"
            value={exerciseDetails.reps}
            onChange={(e) => setExerciseDetails({ ...exerciseDetails, reps: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <label htmlFor="intensity">Intensity (%):</label>
          <input
            type="range"
            id="intensity"
            value={intensity}
            min="0"
            max="100"
            onChange={(e) => setIntensity(parseInt(e.target.value))}
          />
          <span>{intensity}%</span>
        </div>

        {validationError && <p>{validationError}</p>}

        <button type="button" onClick={handleAddExercise}>Add Exercise</button>
      </form>

      <div>
        <h3>Current Workout Plan:</h3>
        <p>Name: {workoutPlan.name}</p>
        <p>Tag: {workoutPlan.tag}</p>

        <ul>
          {workoutPlan.exercises.map((exercise, index) => (
            <li key={index}>
              Exercise: {exercise.exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%
              <button onClick={() => handleRemoveExercise(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutLog;
