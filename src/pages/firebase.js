//firebase.js

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCnOWcBG1VY9kC7jOgoUqiEC7-i6NmyqnI",
  authDomain: "greenfuckingo.firebaseapp.com",
  databaseURL: "https://greenfuckingo-default-rtdb.firebaseio.com",
  projectId: "greenfuckingo",
  storageBucket: "greenfuckingo.appspot.com",
  messagingSenderId: "388498288972",
  appId: "1:388498288972:web:552b5e048d7bdbd106dfe9",
  measurementId: "G-S08XDV0L5W"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
