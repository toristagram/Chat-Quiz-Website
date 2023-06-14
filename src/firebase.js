import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyArB0Zb7M1U_obQ3j0aZgH5mxhsAUTqajE",
  authDomain: "chat-quiz-website-3c306.firebaseapp.com",
  projectId: "chat-quiz-website-3c306",
  storageBucket: "chat-quiz-website-3c306.appspot.com",
  messagingSenderId: "180404885578",
  appId: "1:180404885578:web:4ac9625d5e5fab45be2eb3",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
