import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"; 
import { getDoc, doc, setDoc } from 'firebase/firestore';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            const userDocRef = doc(db, "users", result.user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                await setDoc(userDocRef, { 
                    email: result.user.email,
                    savedWorkouts: [],
                    workouts: [],
                });
                console.log("User document created.");
            }
            navigate('/dashboard'); 
        } catch (err) {
            console.error("Error during sign-in with Google:", err);
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
            <div>
                <input 
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    placeholder="Password..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={signIn}>Sign In</button>
            </div>
            <div>
                <button onClick={signInWithGoogle}>
                    Sign In with Google
                </button>
                <button onClick={logOut}>
                    Log Out
                </button>
            </div>
        </>
    );
};
