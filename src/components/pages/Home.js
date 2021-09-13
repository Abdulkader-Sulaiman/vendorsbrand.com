import React, { useState, useEffect, useRef } from "react";
import ImageSlider from "../../Products/ImageSlider";
import BrandProfile from "../BrandProfile/Profile_Page";
import firebase, { db } from "../../firebase";
import "../../css/ImageSlider.css";
import "../../css/Home.css";
import { useAuth } from "../../contexts/AuthContext";
import "../../css/delete_Product.css";
import { useTranslation } from "react-i18next";
import useOnclickOutside from "react-cool-onclickoutside";
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
  import * as geofirex from 'geofirex'; 
  import Geohash from 'latlon-geohash';
  import useLocalStorage from 'react-use-localstorage';
  import {reactLocalStorage} from 'reactjs-localstorage';
  import { useSessionStorageString } from "react-use-window-sessionstorage";
  


  const mystyle = {
    color: "white",
    backgroundColor: "#1890ff",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
    fontSize: "30px",
   
};

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
    const [GeoHash, SetGeoHash] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });
    const [user, setUser] = useState([], () => {
      const localData = localStorage.getItem('Geohash');
      return localData ? JSON.parse(localData) : [];
  });

  const [name, setName] = useLocalStorage("");
  const [GeoState, setgeoState] = useState("");
 


  console.log(user);
    // const [lat_lngTOgeohash, setlat_lngTOgeohash] = React.useState("");

    const handleChange = (e) => {
      setAddress(e);
      localStorage.setItem("inputValue", e);

  console.log("HHHH")
     
   
    };

    const handleInput3 = (e) => {
      localStorage.setItem("lat", coordinates.lat);
      localStorage.setItem("lng", coordinates.lng);
    };

    const handleInput= (e) => {
      setName(e.target.value)
     
    };

    useEffect(() => {
      // Get the item from local storage. JSON.parse(null) returns null rather than throws
      // Get from local storage before setting it
      const localTodos = localStorage.getItem("users");
     
    }, []);
  

 //   localStorage.setItem("inputV", name);
 const lat = localStorage.getItem("lat")
 const lng = localStorage.getItem("lng")
 const GetGeoHash = localStorage.getItem("MYGeohash")


    useEffect(() => {
      setAddress(localStorage.getItem("inputValue"));
    }, []);
    const lat_lngTOgeohash = Geohash.encode(coordinates.lat, coordinates.lng);
    console.log(coordinates.lat, coordinates.lng)
    const Location_Geohash =  localStorage.getItem("Geohash")
   


    const handleSelect = async value => {
      setAddress(value);
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
      localStorage.setItem("inputValue",  value);
      setgeoState(lat_lngTOgeohash);
    };
 
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
 
    localStorage.setItem("address", address);
    const getLat = localStorage.getItem("lat");
    const getLng = localStorage.getItem("lng");

//********************************
 // localStorage.setItem("Geohash", lat_lngTOgeohash)
  //window.sessionStorage.setItem("key", lat_lngTOgeohash);
//********************************

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
    localStorage.setItem("lat", coordinates.lat);
    localStorage.setItem("lng", coordinates.lng);

    setgeoState(localStorage.setItem("Geohash", lat_lngTOgeohash)) 

    }
  }

    return (
        <div className="Home">
         {/* <UserLocation   /> */}
     <form>
            <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
          <input {...getInputProps({ placeholder: t("Search for Online Stores everywhere you want") })}
              className="Location_input"
              id="Location_input"
              type="search"
              onKeyUp={handleKeyDown}
            />
           {/* <p>Latitude: {lat} </p>
            <p>Longitude: {lng}</p>
            <p>address: {address}</p>
            <p>Geohash: { GetGeoHash }</p> */}
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };
                return (
                  <li 
                  {...getSuggestionItemProps(suggestion, { mystyle })}
                 style=
                 {{
                 // backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                 }}
                  className="Location_suggestions_Home"
                  >
                   <strong style={{cursor: "pointer"}}> {suggestion.description}</strong>
                  </li>
                );
              })}
        
              {/* <button onClick={shoot}>Submit</button> */}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </form> 
            <div className="products">
                {posts.map(
                    ({ id, post }) =>
                    post.location_Geohash == Location_Geohash && (
                            <ImageSlider
                                key={id}
                                userId={post.userId}
                                description={post.description}
                                price={post.Price}
                                productName={post.productName}
                                imageUrl={post.images}
                                docID={post.docID}
                                Brandname={post.Brandname}
                                ProdctLocation={post.ProdctLocation}
                             //   LocationGeoHash={post.location_Geohash}
                            />  
                        )
                )}
            </div>
        </div>
    );
}
export default Home;
