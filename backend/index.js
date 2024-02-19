import express, { request } from 'express';
import {PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import {Exercise} from './models/Exercise.js';

const app = express ();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To Vitality Vault');
});

//Route for saving new workout
app.post('/exercises', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.durationInMin 
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        const newExercise = {
            name: request.body.name,
            durationInMin: request.body.durationInMin,
        };
        const exercise = await Exercise.create(newExercise);
        return response.status(201).send(exercise);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

//Route for getting all exercises from mongoose
app.get('/exercises/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const exercise = await Exercise.findById(id);
        return response.status(200).json(exercise);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for getting one exercises from mongoose via id
app.get('/exercises/:id', async (request, response) => {
    try {
     const { id } = request.params;
     const exercise = await Exercise.findById({id});
     return response.status(200).json(exercise);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Route for updating an exercise
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.name ||
        !request.body.durationInMin ||
        !request.body.sets ||
        !request.body.reps
      ) {
        return response.status(400).send({
          message: 'Send all required fields',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Exercise not found' });
      }
  
      return response.status(200).send({ message: 'Exercise updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });