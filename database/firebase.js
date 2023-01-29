import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-AUTH-DOMAIN.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-STORAGE-BUCKET.appspot.com",
  messagingSenderId: "MESSAGIN-SENDER-ID",
  appId: "YOUR-APP-ID"
};

initializeApp(firebaseConfig);

export const database = getFirestore();
