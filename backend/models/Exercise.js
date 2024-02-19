import mongoose from 'mongoose';
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  name: {
      type: String,
      required: [true, "Name this exercise."]
  },
  durationInMin: {
      type: Number,
      required: true,
      min: [1, 'Enter valid duration in minutes.']
  },
  sets: {
    type: Number,
    required: true,
    min: [1, 'How many sets?']
  },
  rep: {
    type: Number,
    required: true,
    min: [1, 'How many reps?']
  }
});

export const Exercise = mongoose.model("Exercise", ExerciseSchema);