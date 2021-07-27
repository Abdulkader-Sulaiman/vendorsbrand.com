import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from "../contexts/AuthContext"
import firebase, { db } from "../firebase";
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import { Menu, Grid } from "antd";


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
  const classes = useStyles();
  const { currentUser, logout } = useAuth()
  return (
    <div className={classes.root}>
      {/* <Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small/boy-face-avatar-cartoon-free-vector.jpg" className={classes.small} /> */}
 
      {/* { firebase.auth().currentUser !== null && (
       <h6 style={{position: 'relative',top: '10px'}}>{currentUser.email}</h6>
)} */}

      {/* <Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small/boy-face-avatar-cartoon-free-vector.jpg" className={classes.large} /> */}
    </div>
  );
}
