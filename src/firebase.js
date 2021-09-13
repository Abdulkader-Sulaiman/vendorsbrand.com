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
// apiKey: "AIzaSyDycgBKFmqo8X_0mq72tBSjNV77-L9yO8Q",
// authDomain: "vendorsbrand-dev.firebaseapp.com",
// projectId: "vendorsbrand-dev",
// storageBucket: "vendorsbrand-dev.appspot.com",
// messagingSenderId: "759123192862",
// appId: "1:759123192862:web:0392e9aee58697a6f1120f"
});

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
firebase.firestore().settings({timetampsInSnapshots: true})

//seedDatabase(firebase);
export { db, auth, storage};
export default firebase;