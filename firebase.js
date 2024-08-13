// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGxnFPPkcgu0uO3ujddDF-nvsEmwwQY48",
  authDomain: "hs-flashcards-ai.firebaseapp.com",
  projectId: "hs-flashcards-ai",
  storageBucket: "hs-flashcards-ai.appspot.com",
  messagingSenderId: "866590644202",
  appId: "1:866590644202:web:c1ec63c2beb7009f6cc493",
  measurementId: "G-11CMTLWCHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);