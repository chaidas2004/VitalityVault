const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock data
let workouts = [
  { id: 1, name: 'Cardio Blast', tag: 'cardio', exercises: [] }
];

// Get all workouts
app.get('/api/workouts', (req, res) => {
  res.status(200).json(workouts);
});

// Get a single workout by ID
app.get('/api/workouts/:id', (req, res) => {
  const workout = workouts.find(w => w.id === parseInt(req.params.id));
  if (!workout) return res.status(404).send('Workout not found.');
  res.status(200).json(workout);
});

// Create a new workout
app.post('/api/workouts', (req, res) => {
  const { name, tag, exercises } = req.body;
  const newWorkout = { id: workouts.length + 1, name, tag, exercises };
  workouts.push(newWorkout);
  res.status(201).send(newWorkout);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});