import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

  const config = ({
// Vendorsbrand DB

// apiKey: "AIzaSyDKDxKTtBmmbqBsDBOEWDlLVl8UY6WxREM",
// authDomain: "vendorsbrand-ac2aa.firebaseapp.com",
// projectId: "vendorsbrand-ac2aa",
// storageBucket: "vendorsbrand-ac2aa.appspot.com",
// messagingSenderId: "761350509280",
// appId: "1:761350509280:web:541f3dbde0e803df6bb685"

// =================

// apiKey: "AIzaSyBYmrD5ShbPez6KzMKOh_mGJiMo2VSYM3k",
// authDomain: "fir-c2322.firebaseapp.com",
// databaseURL: "https://fir-c2322.firebaseio.com",
// projectId: "fir-c2322",
// storageBucket: "fir-c2322.appspot.com",
// messagingSenderId: "467254453140",
// appId: "1:467254453140:web:6e76ad7eabc25a12ffa581",
// measurementId: "G-53E7WENT2S"


// apiKey: "AIzaSyDycgBKFmqo8X_0mq72tBSjNV77-L9yO8Q",
// authDomain: "vendorsbrand-dev.firebaseapp.com",
// projectId: "vendorsbrand-dev",
// storageBucket: "vendorsbrand-dev.appspot.com",
// messagingSenderId: "759123192862",
// appId: "1:759123192862:web:cf54a05260a4c037f1120f"


// Dev DB
apiKey: "AIzaSyDycgBKFmqo8X_0mq72tBSjNV77-L9yO8Q",
authDomain: "vendorsbrand-dev.firebaseapp.com",
projectId: "vendorsbrand-dev",
storageBucket: "vendorsbrand-dev.appspot.com",
messagingSenderId: "759123192862",
appId: "1:759123192862:web:0392e9aee58697a6f1120f"
});

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
firebase.firestore().settings({timetampsInSnapshots: true})

//seedDatabase(firebase);
export { db, auth, storage};
export default firebase;