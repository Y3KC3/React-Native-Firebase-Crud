import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABaPulQ3dnIGgYcIHjT9R4fU_I_bzYACk",
  authDomain: "react-native-firebase-cr-64382.firebaseapp.com",
  projectId: "react-native-firebase-cr-64382",
  storageBucket: "react-native-firebase-cr-64382.appspot.com",
  messagingSenderId: "758165404428",
  appId: "1:758165404428:web:fa843c4d4c681e5e91a729"
};

initializeApp(firebaseConfig);

export const database = getFirestore();