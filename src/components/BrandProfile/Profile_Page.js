import React, { useState, useEffect } from 'react';
// import '../../css/ProfilePage.css';
import firebase, { db } from "../../firebase";
import {useParams} from 'react-router-dom'
import Slider from "react-slick";
import ImageSlider from '../../Products/ImageSlider';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from '../../Products/styles';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    // ...theme.typography.body2,
    background: 'none',
    padding: theme.spacing(0),
    textAlign: "center",
    // minWidth: 100,
    // minHeight: 100,
    color: "#fff",
  }));
  



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
      console.log('Welcome-From Profile');

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
        var item = document.location.pathname;
        var ProfileID = item.split("/").pop();
        console.log(ProfileID); // get the last item
        return (
            <>
        {/* <h1 style={mystyle}>Here you will find Vendors Products</h1>  */}
        <div className="products" id="products_Profile" style={{position:'relative','top':'-50px'}}>
          <Grid spacing={4}
           justifyContent="center"
              alignItems="center"
              direction="row"
              container
              >
      {
           posts.map(({id, post })=> (
            post.profileUID == ProfileID && (

        <Grid item>
        <Item style={{background:'#dddd'}} >
                   <ImageSlider 
                    key={id}
                    userId={post.userId}
                    description={post.description} 
                    price={post.Price} 
                    productName={post.productName}
                    imageUrl={post.images}
                    docID={post.docID}
                    Brandname={post.Brandname}
                    profileUID={post.profileUID}
                   Location={post.Location}
                   PageName={post.PageName}
               />
        </Item>
        </Grid>
            ) 
           )) 
         
       }
           </Grid>
    </div>
    </>
    )}

 export default Profile__Page
