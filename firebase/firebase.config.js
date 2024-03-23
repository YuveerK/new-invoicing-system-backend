// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL9MrmF9itYBtnGvR9dvtk1X1VQkjKaN4",
  authDomain: "invoicing-system-the-campus.firebaseapp.com",
  projectId: "invoicing-system-the-campus",
  storageBucket: "invoicing-system-the-campus.appspot.com",
  messagingSenderId: "898856483163",
  appId: "1:898856483163:web:40d63c27c6aade8815827e",
  measurementId: "G-NTLBRRTB4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
