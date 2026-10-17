
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMV7jWWPrTgFs2KuJFV8UNfC3MacYPUDc",
  authDomain: "quiz-challenge-4ef24.firebaseapp.com",
  projectId: "quiz-challenge-4ef24",
  storageBucket: "quiz-challenge-4ef24.firebasestorage.app",
  messagingSenderId: "513550536058",
  appId: "1:513550536058:web:d57b5a3ba9b414b7731ac3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
