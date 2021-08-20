import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ImageSlider from "../../Products/ImageSlider";
import BrandProfile from "../BrandProfile/Profile_Page";
import ProductList from "../../Products/ProductList";
import Dashboard from "../Dashboard/Dashboard";
import firebase, { db } from "../../firebase";
import "../../css/ImageSlider.css";
import "../../css/Home.css";

import { useAuth } from "../../contexts/AuthContext";
import "../../css/delete_Product.css";
import { useTranslation } from "react-i18next";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import ClearIcon from "@material-ui/icons/Clear";
import { Button, Input } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

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
    // const [value,  setValue] = useState(localNotes);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const {
        ready,
        value = localStorage.getItem("myLocationValue"),
        suggestions: { status, data },
        setValue = localStorage.getItem("myLocationValue"),

        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
        localStorage.setItem("myLocationValue", description);
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
                <li
                    key={place_id}
                    onClick={handleSelect(suggestion)}
                    className="Location_suggestions_Home"
                >
                    <strong >{main_text}</strong>
                    <small  >{secondary_text}</small>
                </li>
            );
        });

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

    const myLocation = localStorage.getItem("myLocationValue");

    function handleLocalStorageClear(e) {
        localStorage.removeItem("myLocationValue");

        setValue("");
    }

    return (
        <div className="Home">
            <form ref={ref}>
                <input
                    // value={value}
                    // onChange={handleInput}
                    value={myLocation}
                    type="search"
                    onChange={handleChange}
                    placeholder={t("Search for Online Stores everywhere you want")}
                    className="Location_input"
                    id="Location_input"
                    style={
                        {
                            //    justifyContent: 'center',
                            //    textAlign: 'center',
                            //    position:'relative',
                            //     margin:'auto',
                            //     display: 'block',
                        }
                    }
                />

                <Button
                    color="primary"
                    onClick={handleLocalStorageClear}
                    type="submit"
                    //  style={{bottom:'40px', left:'71%'}}
                    className="ClearLocationBTN"
                >
                    <ClearIcon />
                </Button>
                {status === "OK" && <ul>{renderSuggestions()}</ul>}
            </form>

            {/*         
      <div className="Selectt"> */}
            {/* <ReactLanguageSelect
      names={"international"}
      onSelect={(languageCode)=>setSelectedLanguage(languageCode)}
      /> */}

            {/* <h3 className="h3Title" style={{textAlign:'center'}}>{t('Choose any Country Market you like')} </h3> */}
            {/* <CountryDropdown
        value={country}  
        onChange={(val) => setCountry(val)}
        className="CountryDropdown"
        id="country"
   
       
      />  */}

            {/* </div> */}
            {/* <h1 style={mystyle}>Here you will find Vendors Products</h1>  */}
            <div className="products">
                {posts.map(
                    ({ id, post }) =>
                        post.ProdctLocation == myLocation && (
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
                            />
                        )
                )}
            </div>
        </div>
    );
}

export default Home;
