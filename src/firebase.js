
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAwhXd6U9mcmTN1lE-5Cldq466iKjPwV_w",
  authDomain: "chat-app-65ef0.firebaseapp.com",
  projectId: "chat-app-65ef0",
  storageBucket: "chat-app-65ef0.appspot.com",
  messagingSenderId: "329245833744",
  appId: "1:329245833744:web:07edfe00678fd4c5f36895",
  measurementId: "G-GNZ3C67D8T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();