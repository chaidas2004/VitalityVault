import React from 'react';
import './App.css';
import './Dashboard.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, sighnOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2wHRLmXZuLvkZS7GPNxDteyyfmDcerrY",
  authDomain: "vitality-vault.firebaseapp.com",
  projectId: "vitality-vault",
  storageBucket: "vitality-vault.appspot.com",
  messagingSenderId: "941191796132",
  appId: "1:941191796132:web:c77c0d590551ba4d909d31",
  measurementId: "G-QE6LQ40VL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
return (
  <div className="App">
    <header className="App-header">
      <h1>VitalityVault</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#explore-workouts">Explore Workouts</a>
        <a href="#my-workouts">My Workouts</a>
        <a href="#create-workouts">Create Workouts</a>
      </nav>
    </header>
    <div className="content">
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
    </div>
  </div>
);
}




export default App;






