// Config.js
// This file is only for Firebase configuration and export of "auth" and "db".

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Take these values from Firebase console (Project settings)
const firebaseConfig = {
  apiKey: 'AIzaSyD0eSwmSauqUyOrXgysxa2YdJuZsPEvpYA',
  authDomain: 'mobileapp-e1010.firebaseapp.com',
  projectId: 'mobileapp-e1010',
  storageBucket: 'mobileapp-e1010.firebasestorage.app',
  messagingSenderId: '549806558174',
  appId: '1:549806558174:web:57674edf8a7c8f3a932b4f',
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);