import React, { useState, useEffect } from 'react';
import '../../css/ProfilePage.css';
import firebase, { db } from "../../firebase";
import {useParams} from 'react-router-dom'
import Slider from "react-slick";
import ImageSlider from '../../Products/ImageSlider';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from '../../Products/styles';



function Profile__Page({imageUrl, userId, docID}) {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const {uid} = useParams();
    const [posts, SetPosts ] = useState([])
    const [loading, setLoading, ] = useState(false)
    const classes = useStyles();
    const [Brands, SetBrands] = useState([]);
    



     
    var user = firebase.auth().currentUser;
    const ref = firebase.firestore().collection(uid);


    useEffect(() => {
        // Update the document title using the browser API
       
      });
 
    useEffect(() => {
        db.collection("products")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
          SetPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data()})))
          );
        //   var userUid = firebase.auth().currentUser.uid;
        //   setUserId(userUid)
      }, []);




      
    // console.log(ref)
    if(loading){
        return <h1>Loading...</h1>;
    }
 
    const settings = {
        //   dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
        

        return (
            <>

{Brands.map((Brand) => {
                return (
                    <div key={Brand.id} className="BrandName">
                   
                        <div to={Brand.Brandname}>
                            <h4 style={{ fontFamily: "sans-serif" }}>
                                {Brand.Brandname}
                                {Brand.userId}
                            </h4>
                        </div>
                    </div>
                );
            })}


            {firebase.auth().currentUser !== null &&
            firebase.auth().currentUser.uid === userId  && (
               <div>
                   <h1>yes</h1>
                   {userId}
               </div>
            )}
             
        {/* <h1 style={mystyle}>Here you will find Vendors Products</h1>  */}
        <div className="products" id="products_Profile" style={{position:'relative','top':'-50px'}}>
     
       {
           posts.map(({id, post })=> (

            post.BName == uid && (
             
                   <ImageSlider 
                    key={id}
                    userId={post.userId}
                    description={post.description} 
                    price={post.Price} 
                    productName={post.productName}
                    imageUrl={post.images}
                    docID={post.docID}
                    Brandname={post.Brandname}
                    BName={post.BName}
               />
                
            ) 
         
                
           )) 
       }
    
    </div>
    </>
    )}

 export default Profile__Page
 