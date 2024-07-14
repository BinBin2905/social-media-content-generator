import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC8IZn6gIwhY85gGJNFA95V9WWi-JtnOx4",
  authDomain: "social-media-content-gen-6a9ad.firebaseapp.com",
  projectId: "social-media-content-gen-6a9ad",
  storageBucket: "social-media-content-gen-6a9ad.appspot.com",
  messagingSenderId: "812144942239",
  appId: "1:812144942239:web:49a0afec872ca91d30d6aa",
  measurementId: "G-GBG5C7JL28",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { db, auth };
