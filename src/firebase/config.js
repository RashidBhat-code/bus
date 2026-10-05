import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCBzDUDbHGmv1nNPPY0I75tbRqfNNt-NDo",
  authDomain: "bus-ticketing-7e4d1.firebaseapp.com",
  projectId: "bus-ticketing-7e4d1",
  storageBucket: "bus-ticketing-7e4d1.firebasestorage.app",
  messagingSenderId: "384762358688",
  appId: "1:384762358688:web:889bb9b6e517ebf56fd2c5",
  measurementId: "G-L620Z0DD5X"
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
