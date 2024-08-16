// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMOBVsjAokHe_kEFlkdvvTSIilnbQh4Qg",
  authDomain: "hsflashcards-ea448.firebaseapp.com",
  projectId: "hsflashcards-ea448",
  storageBucket: "hsflashcards-ea448.appspot.com",
  messagingSenderId: "638825189308",
  appId: "1:638825189308:web:8687b01a3766c508d2e5b9",
  measurementId: "G-R7EHJWEH5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app, db}