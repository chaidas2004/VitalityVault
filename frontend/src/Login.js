// src/Login.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from './firebaseConfig'; // Adjust this path as needed

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error during sign-in with Google:', error);
    throw error;
  }
};
