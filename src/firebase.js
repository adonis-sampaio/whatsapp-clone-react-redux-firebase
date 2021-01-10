import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
  apiKey: "AIzaSyAwwmiCxIyaBo1v2nqLMnqpYCz352GVaOg",
  authDomain: "whatsapp-clone-89678.firebaseapp.com",
  projectId: "whatsapp-clone-89678",
  storageBucket: "whatsapp-clone-89678.appspot.com",
  messagingSenderId: "632892508126",
  appId: "1:632892508126:web:c8a872d7d44edacd4bbf4f",
  measurementId: "G-1SEV07GMQS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;

