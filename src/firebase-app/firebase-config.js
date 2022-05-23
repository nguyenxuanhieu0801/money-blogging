// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmAI5ZhD5bEcOhL7wpTmt26y8eSZkNwSE",
  authDomain: "mokey-blogging.firebaseapp.com",
  projectId: "mokey-blogging",
  storageBucket: "mokey-blogging.appspot.com",
  messagingSenderId: "939105679655",
  appId: "1:939105679655:web:6c8039d821feb164519102",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
