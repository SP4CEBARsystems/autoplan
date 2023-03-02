// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth       } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaBmwyeWoYyjlnjNgypuGvwTx4yzP1bGo",
  authDomain: "plannedout-ced4a.firebaseapp.com",
  projectId: "plannedout-ced4a",
  storageBucket: "plannedout-ced4a.appspot.com",
  messagingSenderId: "262397217983",
  appId: "1:262397217983:web:cac2109f4da1b5e95a8a0a",
  measurementId: "G-EY036V7NTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// initializeApp(firebaseConfig);
export const auth      = getAuth     (app);
export const firestore = getFirestore(app);