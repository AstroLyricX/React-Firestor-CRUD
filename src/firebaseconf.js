import firebase from "firebase/app";
import "firebase/firestore";


const config = {
    apiKey: "AIzaSyBwzBAflSikoRndd56upN6susmK5r_dStc",
    authDomain: "crud-3e7a2.firebaseapp.com",
    projectId: "crud-3e7a2",
    storageBucket: "crud-3e7a2.appspot.com",
    messagingSenderId: "766503937709",
    appId: "1:766503937709:web:8c88497e9e7c36908d8824"
  };

// Initialize Firebase
const fireb =  firebase.initializeApp(config);
const store = fireb.firestore();

export { store }