// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0eSwmSauqUyOrXgysxa2YdJuZsPEvpYA",
  authDomain: "mobileapp-e1010.firebaseapp.com",
  projectId: "mobileapp-e1010",
  storageBucket: "mobileapp-e1010.firebasestorage.app",
  messagingSenderId: "549806558174",
  appId: "1:549806558174:web:57674edf8a7c8f3a932b4f",
  measurementId: "G-J9M2KZ6T01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
