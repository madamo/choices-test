import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwu5L2_2Y86VbXglfr6bzioCXIDLu7AQ8",
    authDomain: "choices-test.firebaseapp.com",
    databaseURL: "https://choices-test.firebaseio.com",
    projectId: "choices-test",
    storageBucket: "choices-test.appspot.com",
    messagingSenderId: "149567694078"
  };
 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({ timestampsInSnapshots: true })
 
 // export firestore database
 export default firebaseApp.firestore()