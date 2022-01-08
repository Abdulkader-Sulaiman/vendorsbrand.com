import React, { useRef, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import "../css/Signup.css";
import { RocketTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Footer from "../components/footer/SignUp_footer";
import { useTranslation } from "react-i18next";
import Geohash from "latlon-geohash";
import SelectOptions from "../components/SelectOptions";
import firebase, { auth, db } from "../firebase";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MuiPhoneNumber from "material-ui-phone-number";
import Select from "react-select";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";

const mystyle = {
    // color: "white",
    // backgroundColor: "#1890ff",
    // padding: "10px",
    // fontFamily: "Arial",
    // textAlign: "center",
    // fontSize: "30px",
};

const myV = 3;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {/* {'Copyright © '}
      <Link color="inherit" to="/">
       Vendorsbrand
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp({ options, name, onChange, selected }) {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { t } = useTranslation();
    const [pageName, setpageName] = useState("");
    const [Email, setEmail] = useState("");
    const [address, setAddress] = React.useState("");
    const [GeoHash, SetGeoHash] = React.useState("");
    const [GeoState, setgeoState] = useState("");
    const [phoneNumber, SetphoneNumber] = useState();
    const [Gender, SetGender] = useState("");
    // const uid = firebase.auth().currentUser.uid;
    const [gender, Setgender] = useState("");
    const [Label, SetLabel] = useState("");
    const [validated, setValidated] = useState(false);
    const [optionSelected, setSelectedOptions] = useState([]);
    const [AccountType, SetAccountType] = useState("");
    const [UserID, SetUserID] = useState('');
    const [DocId, SetrDocId] = useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null,
    });
 console.log(firebase.auth().fetchSignInMethodsForEmail(Email))
//     if(firebase.auth().fetchSignInMethodsForEmail(Email) == Email) {
        //  Email not exists
//         console.log('Email exists Abdul..')
//        }else {
//            // Email already exists
//            console.log('Email is Not exists..')
//        }
// function funName() {
    

   



    const handleChange2 = (selected) => {
        //   onChange({ name, category: selected.value });
        // export default  Label = selected.label;
        SetAccountType(selected.label);
        setSelectedOptions(selected);
    };
   


    const SelectBox = ({ options, name, onChange, selected }) => {
        // const [AccountType, SetAccountType] = useState("");
        //   const [optionSelected, setSelectedOptions] = useState([]);
        return (
            <Select
                options={options}
                isLoading={!options}
                closeMenuOnSelect={true}
                onChange={handleChange2}
                value={optionSelected}
                name={name}
                selected={selected}
            />
        );
    };
    const data = [
        { id: 1, Name: "Business account" },
        { id: 2, Name: "Personal account" },
    ];

    const lat_lngTOgeohash = Geohash.encode(coordinates.lat, coordinates.lng);
    // console.log(coordinates)
    // console.log("______________________________")
    // console.log(lat_lngTOgeohash)

    const categories = data.map((item) => ({
        value: item.id,
        label: item.Name,
    }));


    const addNeuUSERFirestore = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
        const docID = db.collection("SignUp-data").doc().id;
        db.collection("SignUp-data")
            .doc(docID)
            .set({
            PageName: pageName,
            AccountType: AccountType,
            Email: Email,
            phoneNumber:phoneNumber,
            Location: address,
            location_Geohash: lat_lngTOgeohash,
            profileUID: docID,
            userId: user.uid,
            Gender: Gender,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document:", error);
            });
      }
      return
    });    
        }



    async function handleSubmit(e) {
      
            e.preventDefault();
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match");
            }
            try {
                setError("");
                setLoading(true);
                await signup(emailRef.current.value, passwordRef.current.value);
                history.push("/");
            
            } catch {
                setError("Failed to create an account");
            }
            setLoading(false);
            // funName()
            // addDocumentToFirestore()

            addNeuUSERFirestore()

// // Add a new document with a generated id.
// db.collection('SignUp-data').add({
//          PageName: pageName,
//              AccountType: AccountType,
//              Email: Email,
//             //   phoneNumber:phoneNumber,
//              Location: address,
//             location_Geohash: lat_lngTOgeohash,
//             //  profileUID: docID,
//             // userId: user.uid,
//              Gender: Gender,
//            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });
    }
 
    window.addEventListener( "pageshow", function ( event ) {
        var historyTraversal = event.persisted || 
                               ( typeof window.performance != "undefined" && 
                                    window.performance.navigation.type === 2 );
        if ( historyTraversal ) {
          // Handle page restore.
          window.location.reload();
        }
      });
 


    

       


    const handleSelect = async value => {
        setAddress(value);
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setCoordinates(latLng);
        localStorage.setItem("inputValue",  value);
      };
   

    const handleChange = (e) => {
        setAddress(e);
        // localStorage.setItem("inputValue", e);
        // localStorage.setItem("Geohash", lat_lngTOgeohash);
      };

    function handleOnChange(value) {
        // this.setState({
        //    phone: value
        // });
        SetphoneNumber(value);
    }
    
        
  if(auth.fetchSignInMethodsForEmail('fdsfsfsdf@gmail.com')) {
    
        // The returned 'providers' is a list of the available providers
        // linked to the email address. Please refer to the guide for a more
        // complete explanation on how to recover from this error.
        // console.log('Email is already registered')
    
  }
  auth.fetchSignInMethodsForEmail('fdsfsfsdf@gmail.com').then(function(providers) {
    // The returned 'providers' is a list of the available providers
    // linked to the email address. Please refer to the guide for a more
    // complete explanation on how to recover from this error.
       console.log(providers.data)
  });
    return (
        <>
            <Container
                component="main"
                maxWidth="xs"
                style={{
                    backgroundColor: "#fff",
                    position: "relative",
                    bottom: "100px",
                    padding: "30px",
                }}
            >
                <CssBaseline />
                <div className={classes.paper}>
                    {/* <Typography component="h1" variant="h5"
        style={{backgroundColor:'#fff', position: 'fixed',top:"80px", padding:'10px',
        color:'red',
        left: '112px'

        }}
        >
        {t("Sign Up")}
        </Typography> */}
                    <br />
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form
                        onSubmit={handleSubmit}
                        className={classes.form}
                        noValidate
                    >
                        {/*  */}
                        <Grid container spacing={2}>
                            <Grid tem xs={12}>
                                <Form.Label className="label">
                                    {t("Page Name")}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    //   ref={emailRef}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    required
                                    fullWidth
                                    className="pageName"
                                    label="Page Name"
                                    // name="text"
                                    onChange={(e) =>
                                        setpageName(e.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                        {/*  */}

                        <Grid container spacing={0}>
                            <Grid tem xs={12}>
                                <Form
                                    noValidate
                                    validated={validated}
                                    id="select"
                                >
                                    <Form.Label
                                        className="label"
                                        style={{
                                            marginBottom: "20px",
                                            position: "relative",
                                        }}
                                    >
                                        {t("Page Type")}
                                    </Form.Label>

                                    <SelectBox
                                        options={categories}
                                        name={"select1"}
                                        onChange={handleChange}
                                        id="select"
                                    />
                                </Form>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Form.Label className="label">
                                {t("Phone Number")}
                            </Form.Label>
                            <Grid tem xs={12}>
                                <MuiPhoneNumber
                                    id="PhoneNumber"
                                    defaultCountry={"us"}
                                    onChange={handleOnChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Form.Label className="label">
                            {t("Enter Location")}
                        </Form.Label>
                        <Grid container spacing={2}>
                            <Grid tem xs={12}>
                                {/* Do it here */}

                                <PlacesAutocomplete
                                    value={address}
                                    onChange={handleChange}
                                    onSelect={handleSelect}
                                    id="Location_input"
                                >
                                    {({
                                        getInputProps,
                                        suggestions,
                                        getSuggestionItemProps,
                                        loading,
                                    }) => (
                                        <div>
                                            <Form.Control
                                                {...getInputProps({
                                                    placeholder: t(
                                                        "Search for Online Stores everywhere you want"
                                                    ),
                                                })}
                                                className="Location_input"
                                                id="Location_inp"
                                                type="search"
                                            />
                                            {/* <p>Latitude: {lat} </p>
            <p>Longitude: {lng}</p>
            <p>address: {address}</p>
            <p>Geohash: { GetGeoHash }</p> */}
                                            <div>
                                                {loading ? (
                                                    <div>...loading</div>
                                                ) : null}
                                                {suggestions.map(
                                                    (suggestion) => {
                                                        const style = {
                                                            backgroundColor: suggestion.active
                                                                ? "#41b6e6"
                                                                : "#fff",
                                                        };
                                                        return (
                                                            <li
                                                                {...getSuggestionItemProps(
                                                                    suggestion,
                                                                    { mystyle }
                                                                )}
                                                                style={
                                                                    {
                                                                        // backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                                                    }
                                                                }
                                                                className="Location_suggestions_Home"
                                                            >
                                                                <strong
                                                                    style={{
                                                                        cursor:
                                                                            "pointer",
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    {
                                                                        suggestion.description
                                                                    }
                                                                </strong>
                                                            </li>
                                                        );
                                                    }
                                                )}

                                                {/* <button onClick={shoot}>Submit</button> */}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid tem xs={12}>
                                <Form.Label className="label">
                                    {t("Email")}
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    ref={emailRef}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>

                            <Grid tem xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            checked={Gender === "Female"}
                                            control={<Radio />}
                                            label="Female"
                                            onClick={() => SetGender("Female")}
                                        />
                                        <FormControlLabel
                                            checked={Gender === "Male"}
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                            onClick={() => SetGender("Male")}
                                        />
                                        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid tem xs={12}>
                                <Form.Label className="label">
                                    {t("Password")}
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordRef}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Form.Label className="label">
                                    {t("Password Confirmation")}
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordConfirmRef}
                                    required
                                    fullWidth
                                    id="passwordConf"
                                />
                            </Grid>

                            <Button
                              onClick={() => history.goBack()}
                                onSubmit={handleSubmit}
                                disabled={loading}
                                className="w-100"
                                type="submit"
                                fullWidth
                                className={classes.submit}
                                style={{
                                    background: "rgb(24, 144, 255)",
                                    color: "white",
                                }}
                            >
                                {t("Sign Up")}
                            </Button>
                        </Grid>
                    </Form>
                </div>

                <Grid item>
                    <div className="w-100 text-center mt-2">
                        {t("Already have an account? ")}
                        <Link to="/login" variant="body2">
                            {t("Sign In")}
                        </Link>
                    </div>
                </Grid>

                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            <Footer />
        </>
    );
}
