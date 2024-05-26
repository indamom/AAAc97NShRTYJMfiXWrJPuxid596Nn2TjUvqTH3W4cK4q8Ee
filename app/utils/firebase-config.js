// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_kzygyhazSgjkKOE9vWW9KW36kWCmcV8",
  authDomain: "test2-0-59a70.firebaseapp.com",
  projectId: "test2-0-59a70",
  storageBucket: "test2-0-59a70.appspot.com",
  messagingSenderId: "1024341720942",
  appId: "1:1024341720942:web:d5afb189d264eb4a34cb7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };