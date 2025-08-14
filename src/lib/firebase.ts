
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLhZiRmmnj1CcbSTUsMn5xCXhav7c4A8U",
  authDomain: "techicious-website-25e58.firebaseapp.com",
  projectId: "techicious-website-25e58",
  storageBucket: "techicious-website-25e58.firebasestorage.app",
  messagingSenderId: "648388960346",
  appId: "1:648388960346:web:ab1b59df8f2820fa2a3863",
  measurementId: "G-NHRP0Q3YN2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, firestore, auth, storage, analytics };
