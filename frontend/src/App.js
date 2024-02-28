// src/App.js
import React, { useState } from 'react';
import { signInWithGooglePopup } from './Login'; // Adjust this import path as needed

const App = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {
      const userResult = await signInWithGooglePopup();
      setUser(userResult); // Update state with the signed-in user
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign In with Google</button>
      {user && <div>Signed in as: {user.displayName}</div>}
    </div>
  );
};

export default App;
