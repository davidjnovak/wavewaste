// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA-pInb3lDCeqlbpJ1rceZJxbKomAUjmaY",
  authDomain: "wavewaste-b61b3.firebaseapp.com",
  projectId: "wavewaste-b61b3",
  storageBucket: "wavewaste-b61b3.appspot.com",
  messagingSenderId: "426443434257",
  appId: "1:426443434257:web:e908ed233a311ae98a84b0",
  measurementId: "G-SVCNMPB76J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);