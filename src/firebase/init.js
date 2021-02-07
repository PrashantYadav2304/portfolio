import firebase from 'firebase'
import firestore from 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDm05dNVYnzsj9qFhZQhRLb0D2N0wtUx_g",
    authDomain: "moni-1234.firebaseapp.com",
    databaseURL: "https://moni-1234.firebaseio.com",
    projectId: "moni-1234",
    storageBucket: "moni-1234.appspot.com",
    messagingSenderId: "771111934553",
    appId: "1:771111934553:web:656a2e1204b5efe216ef48"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);


  export default firebaseApp.firestore()