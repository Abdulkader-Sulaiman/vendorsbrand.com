import React, {ref, useEffect, useState} from "react";
import '../../css/profile__Header.css';
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import HomeTabs from './Dashboard';
import firebase, { db, auth } from "../../firebase";
import {useParams} from 'react-router-dom'


function Brandprofile__Page() {
    const {uid} = useParams();
    const [posts, SetPosts ] = useState([])
    const [loading, setLoading, ] = useState(false)

    var user = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('user.uid');

    if(loading){
        return <h1>Loading...</h1>;
    }
   
    return (
        <>
        <div className="storebody">
        <div className="site__header">
            <div className="brand__Info">
            <IconButton style={{ outline: "none" }}>
                    <EmojiFlagsIcon
                        fontSize="large"
                        style={{ color: "#459FEE" }}
                    />
                </IconButton>
                <h1 style={{color:'red'}}>{uid}</h1>
            </div>
        </div>
        <div className="tabs">
            <HomeTabs />
        </div>
    </div>
    </>
    )
}

export default Brandprofile__Page;

