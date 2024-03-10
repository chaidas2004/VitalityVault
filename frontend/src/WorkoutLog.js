import React, { useState, useEffect } from 'react';
import './WorkoutLog.css';
import { useNavigate } from 'react-router-dom';
import { 
  collection,
  doc,
  getDocs,
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
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const [workoutPlan, setWorkoutPlan] = useState({
//     name: '',
//     tag: '',
//     exercises: []
//   });
//   const [selectedExercise, setSelectedExercise] = useState('');
//   const [exerciseDetails, setExerciseDetails] = useState({
//     name: '',
//     description: '',
//     sets: 0,
//     reps: 0
//   });
//   const [intensity, setIntensity] = useState(100); // Default intensity to 100%
//   const [validationError, setValidationError] = useState('');

//   const handleAddExercise = async () => {
//     if (!selectedExercise) {
//       setValidationError('Please select an exercise from the library.');
//       return;
//     }

//     setWorkoutPlan({
//       ...workoutPlan,
//       exercises: [
//         ...workoutPlan.exercises,
//         {
//           exercise: selectedExercise,
//           sets: exerciseDetails.sets,
//           reps: exerciseDetails.reps,
//           intensity: intensity // Include intensity in exercise details
//         }
//       ]
//     });
//     await addDoc(workoutsCol, workoutPlan);

//     // Reset exercise details
//     setSelectedExercise('');
//     setExerciseDetails({ name: '', description: '', sets: 0, reps: 0 });
//     setIntensity(100); // Reset intensity
//     setValidationError('');
//   };

//   const handleRemoveExercise = async (indexToRemove) => {
//     const updatedExercises = workoutPlan.exercises.filter((_, index) => index !== indexToRemove);
//     setWorkoutPlan({ ...workoutPlan, exercises: updatedExercises });
//   };

//   const handleExerciseSelect = async (exercise) => {
//     setSelectedExercise(exercise);
//     setExerciseDetails({ ...exercise });
//   };

//   const handleCreateWorkout = async () => {
//     // Save workout plan to local storage
//     localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));

//     // Save workout plan to workouts collection
//     const newWorkout = addDoc(workoutsCol, workoutPlan)

//     // Save workout plan to users' collection (need await?)
//     await updateDoc(userRef, {
//       workouts: arrayUnion(newWorkout)
//     })

//     // Navigate to My Workouts page
//     navigate('/my-workouts');
//   };

//   return (
//     <div>

//       <form onSubmit={(e) => e.preventDefault()}>
//         

//         {validationError && <p>{validationError}</p>}

//         <button type="button" onClick={handleAddExercise}>Add Exercise</button>

//         {}
//         {workoutPlan.exercises.length > 0 && (
//           <button type="button" onClick={handleCreateWorkout}>Create Workout</button>
//         )}
//       </form>

//       <div>
//         <h3>Current Workout Plan:</h3>
//         <p>Name: {workoutPlan.name}</p>
//         <p>Tag: {workoutPlan.tag}</p>

//         <ul>
//           {workoutPlan.exercises.map((exercise, index) => (
//             <li key={index}>
//               Exercise: {exercise.exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%
//               <button onClick={() => handleRemoveExercise(index)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

//   const exercisesCol = collection(db, 'exercises'); // MAYBE EXERCISES COLLECTION NOT NECESSARY
//   const workoutsCol = collection(db, 'workouts');
//   const userRef = doc(db, 'users', auth.currentUser);
//   const exerciseLibrary = getDocs(exercisesCol);



const [newWorkoutTitle, setNewWorkoutTitle] = useState("");
const [newWorkoutTags, setNewWorkoutTags] = useState([]);
const [exercises, setExercises] = useState([]);

const [workoutList, setWorkoutList] = useState([]);
const [exerciseList, setExerciseList] = useState([]);

const [exerciseName, setExerciseName] = useState("");
const [updatedReps, setUpdatedReps] = useState(0);
const [updatedSets, setUpdatedSets] = useState(0);
const [updatedIntensity, setUpdatedIntensity] = useState(0);

const workoutsCol = collection(db, "workouts");
const exercisesCol = collection(db, "exercises");


const addExercise = () => {
  if (exercises.length < 5) {
    setExercises([...exercises, ""]);
  }
};

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

const getWorkoutList = async () => {
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

useEffect(() => {
  getWorkoutList();
}, [])

const onSubmitWorkout = async () => {
  try {
    await addDoc(workoutsCol, {
      name: newWorkoutTitle, 
      tags: newWorkoutTags,
      exercises: exerciseList,
      userId: auth?.currentUser?.uid
    });

  } catch (err) {
    console.error(err);
  }
}

const removeExercise = async (id) => {
  const workoutDoc = doc(db, "workouts", id);
  await updateDoc(workoutDoc);
};

// const removeExercise =aysnc (id) => {
//   const workoutDoc = doc(db, "workouts", id);
//   await uptateDoc(workoutDoc, )
// }

const updateExercise = async (id) => {
  const exerciseDoc = doc(db, "exercises", id);
  await updateDoc(exerciseDoc, {sets: updatedSets, reps: updatedReps, intensity: updatedIntensity});
};


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

        <h3>Add Exercise</h3>

        <div className='exercise'>
        <div className='input-group'>
          <label htmlFor="exercise">Select Exercise:</label>
          <select
            id="exercise"
            value={exerciseName}
            onChange={(e) => setExerciseName(JSON.parse(e.target.value))}
          >
            <option value="">Select an exercise</option>
            {exerciseList.map((exercise) => (
              <option value={JSON.stringify(exercise.id)}>{exercise.name}</option>
            ))}
          </select>
        </div>
        <div className='input-group'>
        <div>
          <p>Exercise Description:</p>
          <label htmlFor="sets">Sets:</label>
          <input
            type="number"
            // id="sets"
            //value= {exerciseDetails.sets}
            onChange={(e) => setUpdatedSets(e.target.value)}
            // required
          />
        </div>
        <div>
          <label htmlFor="reps">Reps:</label>
          <input
            type="number"
            // id="reps"
            // value={exerciseDetails.reps}
            onChange={(e) => setUpdatedReps(e.target.value)}
            // required
          />
        </div>

        <div>
          <label htmlFor="intensity">Intensity (%):</label>
          <input
            type="range"
            // id="intensity"
            // value={intensity}
            // min="0"
            // max="100"
            onChange={(e) => setUpdatedIntensity(e.target.value)}
          />
          <span>{updatedIntensity}</span>
        </div>
        <button onClick={() => updateExercise()}>
          ADD EXERCISE
        </button>
        </div>
        </div>

    {/* <div>
      <input 
        placeholder = "Workout name..." 
        onChange={(e) => setNewExerciseTitle(e.target.value)}
      />
      <input 
        placeholder='Target muscle...' 
        onChange={(e) => setNewSets(e.target.value)}
      />
      <input 
        placeholder = "Reps..." 
        type='number' 
        onChange={(e) => setNewReps(e.target.value)}
      />
      <button onClick={onSubmitExercise}>Submit Exercise</button>
    </div> */}
  </div>
    <div>
      {workoutList.map((workout) => (
        <div>
          <h2> {workout.name} </h2>
          <ul>
            <li> Tags: {workout.tags} </li>
            <li> Exercises: {workout.exercises} </li>
          </ul>
        </div>
      ))}
    </div>
  </>
);
}

export default WorkoutLog;
