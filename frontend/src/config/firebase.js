import { initializeApp, getApps } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2wHRLmXZuLvkZS7GPNxDteyyfmDcerrY",
  authDomain: "vitality-vault.firebaseapp.com",
  projectId: "vitality-vault",
  storageBucket: "vitality-vault.appspot.com",
  messagingSenderId: "941191796132",
  appId: "1:941191796132:web:c77c0d590551ba4d909d31",
  measurementId: "G-QE6LQ40VL2"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;