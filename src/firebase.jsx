import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBj1F9u6b0j0RaUebo6sxholB3FeOeDepQ",
  authDomain: "yevrolayn.firebaseapp.com",
  projectId: "yevrolayn",
  storageBucket: "yevrolayn.appspot.com",
  messagingSenderId: "169252112007",
  appId: "1:169252112007:web:a084938a5674f91be2da22",
  measurementId: "G-5B98NG7MH2"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 