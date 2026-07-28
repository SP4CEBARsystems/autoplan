
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth       } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
// import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "plannedout-ced4a.firebaseapp.com",
  projectId: "plannedout-ced4a",
  storageBucket: "plannedout-ced4a.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// initializeApp(firebaseConfig);
export const auth      = getAuth     (app);
export const firestore = getFirestore(app);
// export const firestore = initializeFirestore(app, {experimentalForceLongPolling: true});
