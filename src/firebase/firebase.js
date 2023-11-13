// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLrjjQcdKSKOYT8AoHjDr7VjPaj9cEESk",
  authDomain: "react-next-shop-app-866c5.firebaseapp.com",
  projectId: "react-next-shop-app-866c5",
  storageBucket: "react-next-shop-app-866c5.appspot.com",
  messagingSenderId: "43276516587",
  appId: "1:43276516587:web:60852bd0d86f53c7d412ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
