// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-mock-interview-platfo-4481f.firebaseapp.com",
  projectId: "ai-mock-interview-platfo-4481f",
  storageBucket: "ai-mock-interview-platfo-4481f.firebasestorage.app",
  messagingSenderId: "877758339879",
  appId: "1:877758339879:web:2df7a99a93b14becea6702",
  measurementId: "G-6RXM9TJRG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);