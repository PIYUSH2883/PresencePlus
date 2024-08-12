import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDuh0FxrD5oFgLHhNFr3TUBfbNyf5V1Qlc",
  authDomain: "attendancetracker-5c4f7.firebaseapp.com",
  projectId: "attendancetracker-5c4f7",
  storageBucket: "attendancetracker-5c4f7.appspot.com",
  messagingSenderId: "999191962676",
  appId: "1:999191962676:web:78a1c6d1b99dcb12b4d661"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


const auth = getAuth(app);

export { db, auth };