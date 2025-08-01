
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrpmM4au1KjJl8PO81m625au9n4VRJZO8",
  authDomain: "instagram-c8d4f.firebaseapp.com",
  projectId: "instagram-c8d4f",
  storageBucket: "instagram-c8d4f.firebasestorage.app",
  messagingSenderId: "1007478318333",
  appId: "1:1007478318333:web:a8a3fe35b6b559c5254a94"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);