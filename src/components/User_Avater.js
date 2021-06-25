import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from "../contexts/AuthContext"
import firebase, { db } from "../firebase";
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import { Menu, Grid } from "antd";
import {useParams} from 'react-router-dom'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
 
}));
 



export default function ImageAvatars() {

    const {uid} = useParams();
    const [posts, SetPosts ] = useState([])
    const [loading, setLoading, ] = useState(false)
  const classes = useStyles();
  const { currentUser, logout } = useAuth()


  var userId = firebase.auth().currentUser.uid;
  const ref = firebase.firestore().collection(userId);
 
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


  return (
    <div className={classes.root}>
      {/* <Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small/boy-face-avatar-cartoon-free-vector.jpg" className={classes.small} /> */}
 
      { firebase.auth().currentUser !== null && (
       <h6 style={{position: 'relative',top: '10px'}}>{currentUser.email}</h6>,

       posts.map((post) => {
           return(
      <div key={post.id}>
      <Link to={post.Brandname}>
        <h4 style={{position: 'relative',top: '5px'}}>{post.Brandname}</h4>
        </Link>
        {/* {user.uid} */}
       </div>
           )
       })
   

)}





   
    
      {/* <Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small/boy-face-avatar-cartoon-free-vector.jpg" className={classes.large} /> */}
    </div>
  );
}
