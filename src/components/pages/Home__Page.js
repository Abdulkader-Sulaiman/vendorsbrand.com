import React, { useState, useEffect } from "react";
import ImageSlider from '../../Products/ImageSlider';
import firebase, {storage, db, auth  } from "../../firebase";
import FlipMove from "react-flip-move";
import UploadProduct from '../../Products/UploadProduct';

export const imgUrl = UploadProduct.url;

function Home() {
   
     const [posts, setPosts] = useState([]);
     useEffect(() => {
        db.collection("photos")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
         
            );
      }, []);
    
    

    var docRef = db.collection("test").doc("0V1psF9F1PoRlu7KWV4W");

      docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.data());
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
 
}

export default Home