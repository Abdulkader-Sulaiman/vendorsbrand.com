import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SettingsIcon from "@material-ui/icons/Settings";
import { ref, useRef, useEffect, useState, Component } from "react";
import { withFirestore } from "react-firestore";
import firebase, {storage, db, auth  } from "../../firebase";
import '../../css/Settings.css'; 
import UploadProduct from '../../Products/UploadProduct';
import { useTranslation } from "react-i18next";
import {useParams} from 'react-router-dom'
import Select from '../header/EnterStoreLocation'
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";



import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
  

function loadScript(src, position, id) {
    if (!position) {
      return;
    }
  
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  }
  
  const autocompleteService = { current: null };
  
 
  








const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Settings(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [Brandname, setBrandname] = useState("");
    const [write_something, setwrite_Something] = useState("");
    const [foundedBy, setfoundedBy] = useState("");
    const [Headquarters, setHeadquarters] = useState("");
    const [brandIndustry, setbrandIndustry] = useState("");
    const [name, setName] = useState('Tarun');
    const { t } = useTranslation();
    const {uid} = useParams();
    const [loading, setLoading] = useState(true);
    const [BrandLocation, setBrandLocation] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
 
   


    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 300,
      });
   



    let userId = firebase.auth().currentUser.uid;
    const addItem = (Brandname, write_something, foundedBy, Headquarters) => {
       
            db.collection(Brandname).doc('userId')
            .set({
                Brandname: Brandname,
                // about: write_something,
                // foundedBy: foundedBy,
                // Headquarters: Headquarters,  
                // brandIndustry: brandIndustry,
                 Store_location: value, 
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
               
            
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document:", error);
            });
            // console.log('collection exists');
     };

     const docID = db.collection("Brands").doc().id;
        const addnewItems = (Brandname) => {
            db.collection('Brands').doc(docID)
                .set({
                    Brandname: Brandname,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    docID:docID
                })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document:", error);
                });
                var userID = firebase.auth().currentUser.uid;
                db.collection('users').doc(userID)
                .set({
                    Brandname: Brandname,
                     ProdctLocation: value,
                   
                    docID:docID, 
                    // (e) => setPrductPrice(e.target.value)} value={productPrice} 
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    
                })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document:", error);
                });
            };


            const addBrandname = (Brandname) => {
                db.collection(userId).doc(userId)
                    .set({
                        Brandname: Brandname,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        
                    })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document:", error);
                    });
                };


            const addnewItems2 = (Brandname, write_something, foundedBy, Headquarters) => {
                db.collection('userId').doc(Brandname)
                    .set({
                        Brandname: Brandname,
                        // Store_location: BrandLocation,
                        // about: write_something,
                        // foundedBy: foundedBy,
                        // Headquarters: Headquarters,  
                        // brandIndustry: brandIndustry,
                        Store_location: value,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document:", error);
                    });
                };
        

        // inputRef.current.focus
        const handleChange = (event) => {
            setBrandname(event.target.value);
        };
        const handlelocationChange = (event) => {
            setBrandLocation(event.target.value);
        };
            const handleTextarea = (event) => {
                setwrite_Something(event.target.value);
        };

            const handleInput1 = (event) => {
            setfoundedBy(event.target.value);
        };

            const handleInput2 = (event) => {
            setHeadquarters(event.target.value);
        };
            const handleInput3 = (event) => {
            setbrandIndustry(event.target.value);
        };

        const handleSubmit = (event) => {
        event.preventDefault();
    addItem(Brandname, write_something, foundedBy, Headquarters);
    addnewItems(Brandname); //to output all Brandnames in Vendors Page
    addnewItems2(Brandname, write_something, foundedBy, Headquarters);
    addBrandname(Brandname);//to output the current Brandname in Profile_Page
    setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
 

    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          // When user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
          clearSuggestions();
    
          // Get latitude and longitude via utility functions
          getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
              console.log("📍 Coordinates: ", { lat, lng });
            })
            .catch((error) => {
              console.log("😱 Error: ", error);
            });
        };
    
      const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li key={place_id} onClick={handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        });
    
   








    return (
        <div>
 
            <p type="button" onClick={handleOpen}>
                <SettingsIcon
                    style={{
                        position: "relative",
                        fontSize: "33px",
                        top: "10px",
 
                    }}
                />
            </p>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{t("Store Settings")}</h2>
                        <p  id="transition-modal-description">
                        {t("Here you can Publish your Store Profile.")}  
                        </p>
                        <main> 
                    <form onSubmit={handleSubmit} className="storeInfo">
                                <input
                                maxLength="100"
                                    type="text"
                                    onChange={handleChange}
                                    id="name"
                                    value={Brandname}
                                    placeholder= {t("Enter your Business Name")}
                                    autocomplete="false"
                                    className="storName"
                                    required
                                    
                                />
                            {
                              //  onChange=(event, value) => console.log(value.description) 
                               
                            }
                           
   
    


                 {/* <Select /> */}
<div>

                         
                       {/* <CountryDropdown
                                value={country}   
                                onChange={(val) => setCountry(val)}
                                className="Country"
                                
                                    style=
                                    {{
                                    position:'relative',
                                    bottom:'0px',
                                    left:'0px',
                                    padding:'10px'
                                    }}
                                />  */}
   {/* float: right;
    position: relative;
    bottom: 15px;
    left:60px;
    padding:10px; */}

                                {/* <RegionDropdown
                                    country={country}
                                    value={region}
                                    onChange={(val) => setRegion(val)}
                                    className="Region"
                                    style=
                                    {{
                                    position:'relative',
                                    left:'200px',
                                    top:"50px",
                                    padding:'2px'
                                    }}
                                /> */}

                            {/* <div>{country}</div>
                            <div>{region}</div>  */}
                           
</div>
                                {/* <textarea
                                maxLength="400"
                                rows="4" cols="50"
                                onChange={handleTextarea}
                                id="textarea"
                                value={write_something}
                                placeholder={t("Write something about your Brand")}
                                autocomplete="false"
                                /> */}
                                {/* <h5 className="Profile_title">{t("Additional Settings")}</h5> */}
                                {/* <input
                                maxLength="150"
                                    type="text"
                                    onChange={handleInput1}
                                    id="foundedBy"
                                    value={foundedBy}
                                    placeholder={t("Brand Founded by")}
                                    autocomplete="false"
                                /> */}
                                {/* <input
                                maxLength="150"
                                    type="text"
                                    onChange={handleInput2}
                                    id="Headquarters"
                                    value={Headquarters}
                                    placeholder={t("Headquarters")}
                                    autocomplete="false"
                                />   */}
                                {/* <input
                                maxLength="161"
                                    type="text"
                                    onChange={handleInput3}
                                    id="brand__Industry"
                                    value={brandIndustry}
                                    placeholder={t("Brand Industry")}
                                    autocomplete="false"
                                />   */}
        <div ref={ref}>
          <input
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Please enter your Store Location"
            className="Location_input"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>

                                
                                <button type="submit" button onClick={handleSubmit} className="saveBtn">
                                {t("Save")}
                                </button>
                            </form>
                    
                            <button className="cancel" onClick={handleClose}>{t("Cancel")}</button>
                          
                        </main>
                    </div>
                </Fade>
            </Modal>
        
        </div>
    );
}

export default Settings;
