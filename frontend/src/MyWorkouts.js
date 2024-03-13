import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import { useUser } from './AuthContext';
import Header from './Header';
import StopWatch from './StopWatch';

const MyWorkouts = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [comments, setComments] = useState({});
  const [comment, setComment] = useState('');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!currentUser) return;
      const q = query(collection(db, 'workouts'), where('userId', '==', currentUser.uid));
      try {
        const querySnapshot = await getDocs(q);
        const workoutsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSavedWorkouts(workoutsData);
        fetchComments(workoutsData.map(w => w.id));
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };
    fetchWorkouts();
  }, [currentUser]);

  const fetchComments = async (workoutIds) => {
    const newComments = {};
    await Promise.all(workoutIds.map(async (id) => {
      const q = query(collection(db, 'comments'), where('workoutId', '==', id));
      const querySnapshot = await getDocs(q);
      newComments[id] = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }));
    }));
    setComments(newComments);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const deleteComment = async (workoutId, commentId) => {
    try {
      await deleteDoc(doc(db, "comments", commentId)); 
      fetchComments([workoutId]); // Refresh comments after deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const removeWorkout = async (workoutId) => {
    try {
      await deleteDoc(doc(db, "workouts", workoutId));
      setSavedWorkouts(savedWorkouts.filter(workout => workout.id !== workoutId));
    } catch (error) {
      console.error('Error removing workout:', error);
    }
  };

  const submitComment = async (e, workoutId) => {
    e.preventDefault();
    if (!comment.trim() || !workoutId) return;
    try {
      await addDoc(collection(db, "comments"), {//all items to store under the comments Firebase doc
        workoutId,
        comment,
        userId: currentUser.uid
      });
      setComment('');
      setSelectedWorkoutId('');//clear and allow updated comments, refreshing the text field
      fetchComments([workoutId]); 
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <Header />
      <StopWatch /> 
      <button onClick={handleBack}>Back to HomePage</button>
      {savedWorkouts.length === 0 ? (
        <p>No workouts saved yet.</p>
      ) : (
        <div>
          {savedWorkouts.map((workout) => (
            <div key={workout.id}>
              <h3>{workout.name || 'Unnamed Workout'}</h3>
              <p>Tag: {workout.tag}</p>
              <button onClick={() => removeWorkout(workout.id)}>Remove Workout</button>
              <ul>
                {workout.exercises.map((exercise, idx) => (
                  <li key={`${workout.id}-${idx}`}>
                    Exercise: {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Intensity: {exercise.intensity}%
                  </li>
                ))}
              </ul>
              <form onSubmit={(e) => submitComment(e, workout.id)}>
                <input
                  type="text"
                  value={selectedWorkoutId === workout.id ? comment : ''}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setSelectedWorkoutId(workout.id);
                  }}
                  placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
              </form>
              <div style={{ marginTop: '10px' }}>
                {comments[workout.id] && comments[workout.id].map((comment, index) => (
                  <div key={comment.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{comment.comment}</p>
                    <button style={{ marginLeft: '7px', fontSize: '9px' }} onClick={() => deleteComment(workout.id, comment.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWorkouts;
