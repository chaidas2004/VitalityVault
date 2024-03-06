import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from "./config/firebase"; 
import './Login.css';

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        console.error('User closed the sign-in popup');
      } else {
        console.error('Error during sign-in with Google:', err);
      }
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-container">
        {user ? (
          <div className="button-container">
            <p>Hello, {user.displayName || "User"}</p> {}
            <button onClick={logOut}>Log Out</button>
          </div>
        ) : (
          <div className="button-container">
            <button onClick={signInWithGoogle}>Sign In</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;