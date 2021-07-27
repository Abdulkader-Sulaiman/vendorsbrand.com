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
   
    let userId = firebase.auth().currentUser.uid;
    const addItem = (Brandname, write_something, foundedBy, Headquarters) => {
    
            db.collection(Brandname).doc('userId')
            .set({
                Brandname: Brandname,
                // about: write_something,
                // foundedBy: foundedBy,
                // Headquarters: Headquarters,  
                // brandIndustry: brandIndustry,
                Store_location: BrandLocation,
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
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    docID:docID
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
                        Store_location: BrandLocation,
                        about: write_something,
                        foundedBy: foundedBy,
                        Headquarters: Headquarters,  
                        brandIndustry: brandIndustry,
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
                        {t("Here you can Publish or edit your Store Profile.")}  
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
                                />

                            <input
                                maxLength="100"
                                    type="text"
                                    onChange={handlelocationChange}
                                    id="name"
                                    value={BrandLocation}
                                    placeholder= {t("Enter your Business Location")}
                                    autocomplete="ture"
                                />


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
                                <button type="submit" button onClick={handleSubmit} >
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

export default withFirestore(Settings);
