// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEA_Weyd7wCehr7FXiQFdyi2ofiGIQ2v0",
    authDomain: "prepwise-747f6.firebaseapp.com",
    projectId: "prepwise-747f6",
    storageBucket: "prepwise-747f6.firebasestorage.app",
    messagingSenderId: "923831049307",
    appId: "1:923831049307:web:70eba804de4ddcc51eb37e",
    measurementId: "G-73KYBTB5RM"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);