// Config.js
// This file is only for Firebase configuration and export of "auth".

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Take these values from Firebase console (Project settings)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY_HERE',
  authDomain: 'YOUR_AUTH_DOMAIN_HERE',
  projectId: 'YOUR_PROJECT_ID_HERE',
  storageBucket: 'YOUR_STORAGE_BUCKET_HERE',
  messagingSenderId: 'YOUR_SENDER_ID_HERE',
  appId: 'YOUR_APP_ID_HERE',
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);

// Export auth object so we can use it in screens
export const auth = getAuth(app);