import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi8ELahOOwk804gP8lG43Ny_Oelw9OMpM",
  authDomain: "hackathon-on-the-go.firebaseapp.com",
  projectId: "hackathon-on-the-go",
  storageBucket: "hackathon-on-the-go.firebasestorage.app",
  messagingSenderId: "180511179477",
  appId: "1:180511179477:web:76f5ebe485ea7d6b42985c",
  measurementId: "G-JKB806L4MC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const analytics = getAnalytics();