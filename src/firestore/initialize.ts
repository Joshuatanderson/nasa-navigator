import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDJEot8_gxEpYBnDtSpoBK0sxEFJ5rTqq8",
    authDomain: "cosma-75e9e.firebaseapp.com",
    projectId: "cosma-75e9e",
    storageBucket: "cosma-75e9e.appspot.com",
    messagingSenderId: "413899494728",
    appId: "1:413899494728:web:7a31b1bcc9dcb7c15e8f7d"
  }

firebase.initializeApp(config);
  
export const db = firebase.firestore();