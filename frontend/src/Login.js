import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import app from './firebaseConfig';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      console.error('Error during sign-in with Google:', err);
      throw err;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="input-container">
          <input 
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={signIn}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
          <button onClick={logOut}>Log Out</button>
        </div>
      </div>
    </>
  );
};

export default Login;
