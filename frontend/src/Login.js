import React, { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "./config/firebase";
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { useUser } from './AuthContext';
import './Login.css';
import logoImage from './video/IMAGE.webp'; //Logo for VitalityVault
const Login = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (!currentUser) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        console.error('User closed the sign-in popup');
      } else {
        console.error('Error during sign-in with Google:', err);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Fitness made easy for
        <Typewriter
          options={{
            strings: ['students','parents', 'athletes', 'beginners', 'you'],
            autoStart: true,
            loop: true
          }}
        />
        </h1>
      <div className="inner-container">
        <img src={logoImage} alt="VitalityVault Logo" />
        <header className="welcome-header">
          <h1 id='main-title'>VitalityVault</h1>
        </header>
        <div className="button-container">
          <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;