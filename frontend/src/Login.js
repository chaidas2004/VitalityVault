// src/Login.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './firebaseConfig'; 

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
   
    const user = result.user;
    console.log(user); 
   
    return user; // Optionally return user data or another value as needed
  } catch (error) {
   
    console.error(error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
