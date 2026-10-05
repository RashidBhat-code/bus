import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (supports both environment variables and direct defaults)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCBzDUDbHGmv1nNPPY0I75tbRqfNNt-NDo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bus-ticketing-7e4d1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bus-ticketing-7e4d1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bus-ticketing-7e4d1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "384762358688",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:384762358688:web:9ecaafec076f7b486fd2c5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WL32EYGQDK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Analytics conditionally (safely handles environments where analytics isn't supported)
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.debug("Firebase Analytics not initialized:", err.message);
  });
}

export default app;
