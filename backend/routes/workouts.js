const express = require('express');
const router = express.Router();

const { workouts } = require('./data');

// Modified for Name and Tag Search
router.get('/', (req, res) => {
  const { tag, name } = req.query;
  let filteredWorkouts = workouts;
  if (tag) {
      filteredWorkouts = filteredWorkouts.filter(workout => workout.tag === tag);
  }
  if (name) {
      filteredWorkouts = filteredWorkouts.filter(workout => workout.name.toLowerCase().includes(name.toLowerCase()));
  }
  if(filteredWorkouts.length === 0) {
      return res.status(404).send('No matching workouts found.');
  }
  res.json(filteredWorkouts);
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

// Endpoint - search workout plans
router.get('/search', (req, res) => {
  const { tag, duration } = req.query;

  // Filter workouts 
  const filteredWorkouts = workouts.filter(workout => {
      let matchesTag = true, matchesDuration = true;
      if (tag) {
          matchesTag = workout.tag === tag;
      }
      return matchesTag && matchesDuration;
  });

  res.json(filteredWorkouts);
});

module.exports = router;
