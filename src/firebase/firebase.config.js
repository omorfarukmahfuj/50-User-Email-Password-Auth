// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0GmXSruXw1iCvcodDbyh6Bcmv3GqcH9A",
  authDomain: "user-email-password-auth-9ae4b.firebaseapp.com",
  projectId: "user-email-password-auth-9ae4b",
  storageBucket: "user-email-password-auth-9ae4b.appspot.com",
  messagingSenderId: "1015548072578",
  appId: "1:1015548072578:web:33c796f2d2e28214ff5a9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;