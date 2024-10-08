// src/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export const signUpTeacher = async (email, password, name, subject) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'teachers', user.uid), {
            name,
            email,
            subject,
            students: [],
            attendance: [] // Initialize an empty attendance array
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export const signInTeacher = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};