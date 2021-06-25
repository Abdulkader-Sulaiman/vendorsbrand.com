import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

  const config = ({
  apiKey: "AIzaSyBYmrD5ShbPez6KzMKOh_mGJiMo2VSYM3k",
  authDomain: "fir-c2322.firebaseapp.com",
  databaseURL: "https://fir-c2322.firebaseio.com",
  projectId: "fir-c2322",
  storageBucket: "fir-c2322.appspot.com",
  messagingSenderId: "467254453140",
  appId: "1:467254453140:web:6e76ad7eabc25a12ffa581",
  measurementId: "G-53E7WENT2S"
});

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
firebase.firestore().settings({timetampsInSnapshots: true})

//seedDatabase(firebase);
export { db, auth, storage};
export default firebase;