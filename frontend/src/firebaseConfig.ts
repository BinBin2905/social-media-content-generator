import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8IZn6gIwhY85gGJNFA95V9WWi-JtnOx4",
  authDomain: "social-media-content-gen-6a9ad.firebaseapp.com",
  projectId: "social-media-content-gen-6a9ad",
  storageBucket: "social-media-content-gen-6a9ad.appspot.com",
  messagingSenderId: "812144942239",
  appId: "1:812144942239:web:49a0afec872ca91d30d6aa",
  measurementId: "G-GBG5C7JL28",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
