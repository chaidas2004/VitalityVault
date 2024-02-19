const express = require('express');
// Enable the router to access parameters from the parent router
const router = express.Router({ mergeParams: true });

const { workouts } = require('./data');
//let workouts = require('./workouts').workouts; 

// Middleware to find a workout by ID
const findWorkout = (req, res, next) => {
  const workout = workouts.find(w => w.id === parseInt(req.params.workoutId));
  if (!workout) {
    return res.status(404).send('Workout not found.');
  }
  req.workout = workout;
  next();
};

// Add an exercise to a workout plan
router.post('/', findWorkout, (req, res) => {
  const { name, duration, sets, reps } = req.body;
  const exercise = { id: req.workout.exercises.length + 1, name, duration, sets, reps };
  req.workout.exercises.push(exercise);
  res.status(201).json(exercise);
});

// Delete an exercise from a workout plan
router.delete('/:exerciseId', findWorkout, (req, res) => {
    const exerciseId = parseInt(req.params.exerciseId);
    req.workout.exercises = req.workout.exercises.filter(e => e.id !== exerciseId);
    res.status(204).send();
});
  
// Update an exercise in a workout plan
router.put('/:exerciseId', findWorkout, (req, res) => {
    const exerciseId = parseInt(req.params.exerciseId);
    let exerciseIndex = req.workout.exercises.findIndex(e => e.id === exerciseId);
    if (exerciseIndex === -1) return res.status(404).send('Exercise not found.');
  
    // Update exercise details
    const updatedExercise = { ...req.workout.exercises[exerciseIndex], ...req.body, id: exerciseId };
    req.workout.exercises[exerciseIndex] = updatedExercise;
    res.json(updatedExercise);
});

module.exports = router;
