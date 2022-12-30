import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCrq0ux-0ZSRyzyOUEIFf-bROvkACIxZlQ",
  authDomain: "travelerapp-fbbcd.firebaseapp.com",
  databaseURL: "https://travelerapp-fbbcd-default-rtdb.firebaseio.com",
  projectId: "travelerapp-fbbcd",
  storageBucket: "travelerapp-fbbcd.appspot.com",
  messagingSenderId: "21982079179",
  appId: "1:21982079179:web:41f68304d86a8521c5534e",
  measurementId: "G-CB94R2N5P0"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
