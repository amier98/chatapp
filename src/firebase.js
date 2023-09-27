import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import  { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgKfwEpzUiDeRAbAZ8flvuHnkL4cUbAH0",
  authDomain: "chatapp-63264.firebaseapp.com",
  projectId: "chatapp-63264",
  storageBucket: "chatapp-63264.appspot.com",
  messagingSenderId: "370868683587",
  appId: "1:370868683587:web:3001d7f653d9fde53d65f6",
  measurementId: "G-GFVWYLKQ8M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()