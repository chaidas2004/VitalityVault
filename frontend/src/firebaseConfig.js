
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBhBiaOF7elC03-B1isdgNtSdrNLZiMG7Q",
  authDomain: "vitalityvaultapp.firebaseapp.com",
  projectId: "vitalityvaultapp",
  storageBucket: "vitalityvaultapp.appspot.com",
  messagingSenderId: "879553115891",
  appId: "1:879553115891:web:977955b4ce7f46eabd6986",
  measurementId: "G-TY4D8RYTG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app