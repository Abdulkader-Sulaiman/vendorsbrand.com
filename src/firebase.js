import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

  const config = ({
// Vendorsbrand DB

apiKey: "AIzaSyDKDxKTtBmmbqBsDBOEWDlLVl8UY6WxREM",
authDomain: "vendorsbrand-ac2aa.firebaseapp.com",
projectId: "vendorsbrand-ac2aa",
storageBucket: "vendorsbrand-ac2aa.appspot.com",
messagingSenderId: "761350509280",
appId: "1:761350509280:web:541f3dbde0e803df6bb685"

// Dev DB
 
});

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
firebase.firestore().settings({timetampsInSnapshots: true})

//seedDatabase(firebase);
export { db, auth, storage};
export default firebase;