const express = require('express');
const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

const workoutRoutes = require('./routes/workouts');
const exerciseRoutes = require('./routes/exercises');

app.use('/workouts', workoutRoutes);
app.use('/workouts/:workoutId/exercises', exerciseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
