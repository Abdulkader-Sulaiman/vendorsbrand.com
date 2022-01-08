import React, { useState, useEffect, useRef } from "react";
import ImageSlider from "../../Products/ImageSlider";
import BrandProfile from "../BrandProfile/Profile_Page";
import firebase, { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
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
import { display, margin } from "@mui/material/node_modules/@mui/system";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import PropTypes from "prop-types";
import Divider from '@mui/material/Divider';
import { BiCar, BiCard } from "react-icons/bi";
import { BiRestaurant, BiHomeSmile} from "react-icons/bi";
import { VscVm  } from "react-icons/vsc";
import CategoriesTabs from './CategoriesTabs'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";
import PageHeader from '../header/PageHeader'
import ProductPage from "../../Products/FetchingproductData";
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
  
  function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );
  
      if (anchor) {
        anchor.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Zoom>
    );
  }

 
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
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });
  
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  
    
    const handleChange = (e) => {
      setAddress(e);
      localStorage.setItem("inputValue", e);
      localStorage.setItem("Geohash", lat_lngTOgeohash);
    };

    useEffect(() => {
      setAddress(localStorage.getItem("inputValue"));
    }, []);
  

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
      <div style={{position: 'relative', top: '-150px'}}>
      <PageHeader />

       
      </div>
 
     {/* <h1>Device Test!</h1>
    {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
    {isBigScreen && <p>You  have a huge screen</p>}
    {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
    <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
    {isRetina && <p>You are retina</p>} */}

        {/* <CategoriesTabs/> */}
      {/* <div style={{ 
    maxHeight:'100px',
    display:'flex',
    justifyContent: 'center',
    position:'relative',
    top:'30px',
    }}>

     </div>   */}
   

        <div className="products">
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                return (
                    <div>
                        <input {...getInputProps({ placeholder: t("Search for Online Stores everywhere you want") })}
                            className="Location_input"
                            id="Location_input" />
         
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
            <div className="products" 
            style={{position: 'relative', bottom: '35px'}}>
            <Grid container spacing={8}
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
        <Item  style={{background:'#dddd'}} >
             <ImageSlider
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
            /> 
       
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
