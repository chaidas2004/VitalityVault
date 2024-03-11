import React, { useState, useEffect } from 'react';
import './WorkoutLog.css';
import { useNavigate } from 'react-router-dom';
import { 
  collection,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  addDoc,
  updateDoc,
  arrayUnion, 
} from 'firebase/firestore';
import { auth, db } from './config/firebase.js';
import { Auth } from './components/auth';
import Dashboard from './Dashboard.js';

// [
//  { name: 'Squats', description: 'A compound exercise that targets the muscles of the lower body.', sets: 3, reps: 10 },
//  { name: 'Push-ups', description: 'A bodyweight exercise that targets the muscles of the chest, shoulders, and arms.', sets: 3, reps: 12 },
//  { name: 'Deadlifts', description: 'A compound exercise that targets the muscles of the lower back, hamstrings, and glutes.', sets: 3, reps: 8 },
// ];

const WorkoutLog = () => {


//For New user logged workout:
const [newWorkoutTitle, setNewWorkoutTitle] = useState("");
const [newWorkoutTags, setNewWorkoutTags] = useState([]);
const [exercises, setExercises] = useState([]);

//get all of the existing workouts and exercises
const [workoutList, setWorkoutList] = useState([]); //may not need here 
const [exerciseList, setExerciseList] = useState([]);

//For exercises to be added to the workout
const [exerciseId, setExerciseId] = useState(""); 
const [updatedReps, setUpdatedReps] = useState(0);
const [updatedSets, setUpdatedSets] = useState(0);
const [updatedIntensity, setUpdatedIntensity] = useState(0);

//database collections
const workoutsCol = collection(db, "workouts");
const exercisesCol = collection(db, "exercises");

const [showInput, setShowInput] = useState(false);

const toggleInput = () => {
  setShowInput(!showInput);
};

// const getWorkoutList = async () => {
//   try {
//     const data = await getDocs(exercisesCol);
//     const filteredData = data.docs.map((doc) => ({
//       ...doc.data(), 
//       id: doc.id,
//     }));
//     setExerciseList(filteredData);
//   } catch (err) {
//     console.error(err);
//   }
// };

//get all the exercises
useEffect(() => {
  const getExerciseList = async () => {
    try {
      const data = await getDocs(exercisesCol);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id,
      }));
      setExerciseList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  getExerciseList();
}, [])


const updateExercise = async (id) => {
  toggleInput();
  const exerciseDoc = doc(db, "exercises", id);
  
  await updateDoc(exerciseDoc, {sets: updatedSets, reps: updatedReps, intensity: updatedIntensity});
  
  const updatedDoc = await getDoc(exerciseDoc);

  if (updatedDoc.exists() && exercises.length < 5) {
    // Use the data from the updated document
    const updatedExerciseData = { id: updatedDoc.id, ...updatedDoc.data() };

    // Update your state array with the updated data
    setExercises(currentExercises => [...currentExercises, updatedExerciseData]);
  } else {
    console.log("No such document!");
  }
};

const removeExercise = async (index) => {
  const updatedExercises = [...exercises];
  updatedExercises.splice(index, 1);
  setExercises(updatedExercises);
};

const onSubmitWorkout = async () => {
  try {
    await addDoc(workoutsCol, {
      name: newWorkoutTitle, 
      tags: newWorkoutTags,
      exercises: exercises,
      userId: auth?.currentUser?.uid
    });

  } catch (err) {
    console.error(err);
  }
}


return (
  <>
    <Dashboard />
    <div className='newWorkout'>
      <h2> Plan Logging</h2>
      <div>
        <label htmlFor="name">Workout Plan Name:</label>
        <input
          type="text"
          // id="name"
          // value={workoutPlan.name}
          onChange={(e) => setNewWorkoutTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="tag">Muscle Group Tag:</label>
        <input
          type="text"
          // id="tag"
          // value={workoutPlan.tag}
          onChange={(e) => setNewWorkoutTags(e.target.value)}
          required
        />
      </div>
      <h3>Exercises</h3>
      {exercises.map((inWorkout, index) => (
        <div className='exercise'>
          <div className='input-group'>
            <h4> {inWorkout.name} </h4>
            <button onClick={() => removeExercise(index)}>
                remove
            </button>
          </div>
          <div className='input-group'>
            <ul>
              <li> Sets: {inWorkout.sets} </li>
              <li> Reps: {inWorkout.reps} </li>
              <li> intensity: {inWorkout.intensity} </li>
            </ul>        
          </div>    
        </div>
      ))}
      {exercises.length < 5 && 
        <button className='plus'
          onClick={toggleInput}
        >
          +
        </button>
      }
      {showInput &&
      <div className='exercise'>
        <div className='input-group'>
          <label htmlFor="exercise">Select Exercise:</label>
          <select
            onChange={(e) => setExerciseId(e.target.value)}
          >
            <option value="">Select an exercise</option>
            {exerciseList.map((exercise) => (
              <option value={exercise.id}>{exercise.name}</option>
            ))}
          </select>
        </div>
        <div className='input-group'>
          <div>
            <p>Exercise Description:</p>
            <label htmlFor="sets">Sets:</label>
            <input
              type="number"
              //value= {exerciseDetails.sets}
              onChange={(e) => setUpdatedSets(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reps">Reps:</label>
            <input
              type="number"
              // value={exerciseDetails.reps}
              onChange={(e) => setUpdatedReps(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="intensity">Intensity (%):</label>
            <input
              type="range"
              // value={intensity}
              min="0"
              max="100"
              onChange={(e) => setUpdatedIntensity(e.target.value)}
            />
            <span>{updatedIntensity}</span>
          </div>
          <button onClick={() => updateExercise(exerciseId)}>
            SAVE EXERCISE
          </button>
        </div>
      </div>
      }
    </div>
    {exercises.length > 0 && 
      <button onClick={() => onSubmitWorkout()}>SAVE WORKOUT</button>
    }
  </>
);
}

export default WorkoutLog;
