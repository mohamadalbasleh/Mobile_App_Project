import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0eSwmSauqUyOrXgysxa2YdJuZsPEvpYA",
  authDomain: "mobileapp-e1010.firebaseapp.com",
  projectId: "mobileapp-e1010",
  storageBucket: "mobileapp-e1010.firebasestorage.app",
  messagingSenderId: "549806558174",
  appId: "1:549806558174:web:57674edf8a7c8f3a932b4f",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = getAuth(app);
} catch {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { app, auth, db };