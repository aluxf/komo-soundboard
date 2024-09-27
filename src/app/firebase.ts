// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-GLpVULDOYSlhopBwH02zfS5UI0rCiG8",
  authDomain: "komo-soundboard.firebaseapp.com",
  projectId: "komo-soundboard",
  storageBucket: "komo-soundboard.appspot.com",
  messagingSenderId: "942621281632",
  appId: "1:942621281632:web:d9a59d05efa04de37e2205",
  measurementId: "G-F4JXPDCPTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
     app,
     db,
     storage
}