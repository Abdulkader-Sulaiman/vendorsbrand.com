import React, { useState, useEffect, useRef } from "react";
import ImageSlider from "../../Products/ImageSlider";
import BrandProfile from "../BrandProfile/Profile_Page";
import firebase, { db } from "../../firebase";
import "../../css/ImageSlider.css";
import "../../css/Home.css";
import { useAuth } from "../../contexts/AuthContext";
 import "../../css/delete_Product.css";
import { useTranslation } from "react-i18next";
import ClearIcon from "@material-ui/icons/Clear";
import { Button, Input } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Geocode from "react-geocode";
import  UserLocation  from '../BrandProfile/UserLocation'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import * as firebaseApp from 'firebase/app'
import Geohash from 'latlon-geohash';
import Sidebar from '../header/Sidebar'
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { display } from "@mui/material/node_modules/@mui/system";


const mystyle = {
    color: "white",
    backgroundColor: "#1890ff",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
    fontSize: "30px",
   
};



const Item = styled(Paper)(({ theme }) => ({
    // ...theme.typography.body2,
    background: 'none',
    padding: theme.spacing(0),
    textAlign: "center",
    // minWidth: 100,
    // minHeight: 100,
    color: "#fff",
  }));
  

function Home() {
    const [posts, setPosts] = useState([]);
    const { currentUser, logout } = useAuth();
    const [userId, setUserId] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const { t } = useTranslation();
    const [selectedClient, setSelectedClient] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const localNotes = localStorage.getItem("notes");
    const [value,  setValue] = useState(localNotes);
    const handleChange = (e) => {
      setAddress(e);
      localStorage.setItem("inputValue", e);
      localStorage.setItem("Geohash", lat_lngTOgeohash);
    };

    useEffect(() => {
      setAddress(localStorage.getItem("inputValue"));
    }, []);
  
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });
  
    const handleSelect = async value => {
      setAddress(value);
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
      localStorage.setItem("inputValue",  value);
    };
 



    const user = firebase.auth().currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    console.log('User is signed in',"Email =", 
    user.email
    
    )
    
    } else {
      // No user is signed in.
      console.log('No user is signed in.')
    }
    


    useEffect(() => {
        db.collection("products")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                )
            );
        //   var userUid = firebase.auth().currentUser.uid;
        //   setUserId(userUid)
    }, []);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <h1>Loading...</h1>;
    }
   
    const lat_lngTOgeohash = Geohash.encode(coordinates.lat, coordinates.lng);
    localStorage.setItem("lat", coordinates.lat);
    localStorage.setItem("lng", coordinates.lng);
    localStorage.setItem("address", address);
 
    const Location_Geohash = localStorage.getItem("Geohash");
    const getLat = localStorage.getItem("lat");
    const getLng = localStorage.getItem("lng");
  


if(1 == 1) {

    return (
        <>
      
<div
>

 
 
 
            {/* <div className="item">box-1</div>
            <div className="item">box-2</div>
            <div className="item">box-3</div>
            <div className="item">box-4</div>
            <div className="item">box-5</div>
            <div className="item">box-6</div>
            <div className="item">box-7</div>
            <div className="item">box-8</div>
            <div className="item">box-9</div>
            <div className="item">box-10</div>
            <div className="item">box-11</div>
            <div className="item">box-13</div>
            <div className="item">box-12</div>
            <div className="item">box-14</div>
            <div className="item">box-15</div>
            <div className="item">box-16</div> */}
</div>




        <div className="products"
        style={{position: 'relative', textAlign: 'center',top: '28px', color: 'red'}}
        >

        
           {/* <h1>Home Page </h1> */}
       

         {/* <UserLocation   /> */}
       <div>  
       {/* <Sidebar /> */}
       </div>
            {/* <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      > */}
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                return (
                    <div>
                        <input {...getInputProps({ placeholder: t("Search for Online Stores everywhere you want") })}
                            className="Location_input"
                            id="Location_input" />
                        {/* <p>Latitude: {coordinates.lat}</p>
             <p>Longitude: {coordinates.lng}</p>
             <p>Geohash: {lat_lngTOgeohash}</p>
             <p>address: {address}</p> */}
                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                };
                                return (
                                    <li
                                        {...getSuggestionItemProps(suggestion, { mystyle })}
                                        style={{
                                            // backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                        }}
                                        className="Location_suggestions_Home"
                                    >
                                        <strong style={{ cursor: "pointer" }}> {suggestion.description}</strong>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                );
            }}
      {/* </PlacesAutocomplete> */}
            <div className="products" >
          
            <Grid container spacing={10}
             justifyContent="center"
                alignItems="center"
                direction="row"
            >

          {posts.map(
    ({ id, post }) =>
    post
//.location_Geohash
     && (
  
        <Grid item  >
        <Item style={{background:'#dddd'}} >
             {/* <ImageSlider
                key={id}
                userId={post.userId}
                description={post.description}
                price={post.Price}
                productName={post.productName}
                imageUrl={post.images}
                docID={post.docID}
                Brandname={post.Brandname}
                Location={post.Location}
                profileUID={post.profileUID}
                PageName={post.PageName}
             //   LocationGeoHash={post.location_Geohash}
            />  */}
       
             </Item>
             </Grid>
           
        )
         

)}
      </Grid>
            </div>
            
         
        </div>
        </>
    );
}else {

    return <div>No Product yet</div>;
}
  

}

export default Home;
