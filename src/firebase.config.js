// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8gfCHmqUtZ807722h2iPXcqBX9lLTjig",
  authDomain: "lottery-2b6ea.firebaseapp.com",
  projectId: "lottery-2b6ea",
  storageBucket: "lottery-2b6ea.firebasestorage.app",
  messagingSenderId: "186616795071",
  appId: "1:186616795071:web:55aa7199f5b7ec1d735b0a",
  measurementId: "G-1LK7P3F91F"
};

// firebase.initializeApp(config);  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export { app, auth };