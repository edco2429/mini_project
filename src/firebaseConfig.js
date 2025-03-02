// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT1UaJIVVAuos6-fc57afxrBCsrNzSU5E",
  authDomain: "event-eagles-agnethon.firebaseapp.com",
  projectId: "event-eagles-agnethon",
  storageBucket: "event-eagles-agnethon.appspot.com",
  messagingSenderId: "609228557271",
  appId: "1:609228557271:web:0b38345fd23ae71e1fd992",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {
  signInWithEmailAndPassword,
  auth,
  createUserWithEmailAndPassword,
  signOut,
  doc,
  setDoc,
  getDoc,
  getDocs,
  db,
  updateDoc,
};
