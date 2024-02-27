// src/App.js
import React from 'react';
import { signInWithGooglePopup } from './Login'; // Ensure this import matches your file structure

const App = () => {
  return (
    <div>
      <button onClick={signInWithGooglePopup}>Sign In with Google</button>
    </div>
  );
}

export default App;
