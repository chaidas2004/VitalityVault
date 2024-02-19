const express = require('express');
const router = express.Router();

const { workouts } = require('./data');

// Get all workout plans
router.get('/', (req, res) => {
  res.json(workouts);
});

// Get a single workout plan by ID
router.get('/:id', (req, res) => {
  const workout = workouts.find(w => w.id === parseInt(req.params.id));
  if (!workout) return res.status(404).send('Workout not found.');
  res.json(workout);
});

// Create a new workout plan
router.post('/', (req, res) => {
  const { name, tag } = req.body;
  const newWorkout = {
    id: workouts.length + 1,
    name,
    tag,
    exercises: []
  };
  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

module.exports = router;
