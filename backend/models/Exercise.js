import mongoose from 'mongoose';
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  name: {
      type: String,
      required: [true, "Name this exercise."]
  },
  duration: {
      type: Number,
      required: true,
      min: [1, 'Enter valid duration.']
  }
});

export const Exercise = mongoose.model("Exercise", ExerciseSchema);