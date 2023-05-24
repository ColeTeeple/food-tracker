// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn2ALTmUCgDkRasZF8R-WyqzgYFmKdnyo",
  authDomain: "food-tracker-e8eac.firebaseapp.com",
  projectId: "food-tracker-e8eac",
  storageBucket: "food-tracker-e8eac.appspot.com",
  messagingSenderId: "656931304883",
  appId: "1:656931304883:web:85a927fbfa54cf763cc7c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;