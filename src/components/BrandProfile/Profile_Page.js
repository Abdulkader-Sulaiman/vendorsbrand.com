import React, { useState, useEffect } from 'react';
import '../../css/ProfilePage.css';
import firebase, { db } from "../../firebase";
import {useParams} from 'react-router-dom'

function Profile__Page({imageUrl, userId, docID}) {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const {uid} = useParams();
    const [posts, SetPosts ] = useState([])
    const [loading, setLoading, ] = useState(false)

    var user = firebase.auth().currentUser;
    const ref = firebase.firestore().collection(uid);



    //REALTIME GET FUNCTION
    function getUserData() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
        });
        SetPosts(items);
        setLoading(false);
        });
    }

        useEffect(() => {
                getUserData();
            // eslint-disable-next-line
        }, []);


    // console.log(ref)
    if(loading){
        return <h1>Loading...</h1>;
    }

     return (
         <div>
            {
       posts.map((post) => {
           return(
      <div key={post.id} >
        <h2>{post.about}</h2>
        <h2>{post.Headquarters}</h2>
        <h2>{post.brandIndustry}</h2>
        <h2>{post.foundedBy}</h2>
        {/* {user.uid} */}
       </div>
           )
       })
   }
</div>
     )
 }
 export default Profile__Page
 