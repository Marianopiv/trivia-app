// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCWCOdsGAE48u1i-VWuWiWQAkFVvHp4Pcs",

  authDomain: "trivia-bf45b.firebaseapp.com",

  projectId: "trivia-bf45b",

  storageBucket: "trivia-bf45b.appspot.com",

  messagingSenderId: "668771298941",

  appId: "1:668771298941:web:b5d5fa572697aabc07cb14",
};

// Initialize Firebase

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const db = getFirestore(app);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const database = getDatabase(app);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const auth = getAuth(app);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const storage = getStorage(app);
