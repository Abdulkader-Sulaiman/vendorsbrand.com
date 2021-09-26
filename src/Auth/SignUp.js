import React, { useRef, useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Form, Alert } from "react-bootstrap"
 import '../css/Signup.css';
import { RocketTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom"
import Footer from '../components/footer/SignUp_footer'
import { useTranslation } from "react-i18next";
import Geohash from "latlon-geohash";
import SelectOptions from "../components/SelectOptions";
import firebase, { auth, db } from "../firebase";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const classes = useStyles();
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { t } = useTranslation();
  const [pageName, setpageName] = useState('');
  const [Email, setEmail] = useState('');
//   console.log(pageName)
const [address, setAddress] = React.useState("");
const [GeoHash, SetGeoHash] = React.useState("");
const [GeoState, setgeoState] = useState("");
const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
});

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    
   const uid = firebase.auth().currentUser.uid;
  db.collection('cites').doc(uid)
  .set({
    user_uid: 'H3IziIFg8TZtcQ7ERxxXcNilTcG2',
    PageName: pageName,
    Email:Email,
    gender: 'male',
    username: 'Abdul',
    InputValue: 'Value6666',
    text: 'submit User Data '
  })} 
    
    
    catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  const lat_lngTOgeohash = Geohash.encode(coordinates.lat, coordinates.lng);
  
  const handleSelect = async (value) => {
    setAddress(value);
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
    localStorage.setItem("inputValue", value);
    setgeoState(lat_lngTOgeohash);
};

  const handleChange = (e) => {
    setAddress(e);
    localStorage.setItem("inputValue", e);
};


  return (
    <>
     <Container component="main" maxWidth="xs" style={{backgroundColor:'#fff', position: 'relative',top:"60px", padding:'30px'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        {t("Sign Up")}
        </Typography>
        <br />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className={classes.form} noValidate>
         
{/*  */}
<Grid container spacing={2}>
          <Grid tem xs={12}>
       
              <Form.Label className='label'>{t("Page name")}</Form.Label>
              <Form.Control type="text" 
              ref={emailRef} required 
               fullWidth
               variant="outlined"
                required
                fullWidth
                id="pageName"
                label="Page Name"
                name="text"
                onChange={e => setpageName(e.target.value)}
               />
           </Grid>
           </Grid>
{/*  */}

<Grid container spacing={0}>
          <Grid tem xs={12}>

              <SelectOptions />
           </Grid>
           </Grid>
   
   

   
           <Form.Label className='label'>{t("Enter Location")}</Form.Label>
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
                                {loading ? <div>...loading</div> : null}
                                {suggestions.map((suggestion) => {
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
                                                style={{ cursor: "pointer" }}
                                            >
                                                {" "}
                                                {suggestion.description}
                                            </strong>
                                        </li>
                                    );
                                })}

                                {/* <button onClick={shoot}>Submit</button> */}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
           </Grid>
           </Grid>



          <Grid container spacing={2}>
          <Grid tem xs={12}>
              <Form.Label className='label'>{t("Email")}</Form.Label>
              <Form.Control type="email" 
              ref={emailRef} required 
               fullWidth
               variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
               />
           </Grid>
  
           <Grid tem xs={12}>
              <Form.Label className='label'>{t("Password")}</Form.Label>
              <Form.Control type="password" 
              ref={passwordRef} required  
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
              <Form.Label className='label'>{t("Password Confirmation")}</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required fullWidth  id="passwordConf"/>
            </Grid>
            <Button 
            onSubmit={handleSubmit}
            disabled={loading} 
            className="w-100" 
            type="submit"
            fullWidth
            className={classes.submit}
            style={{background:'rgb(24, 144, 255)',
            color:'white',
            
            }}
            >
              {t("Sign Up")}
            
            </Button>
            </Grid>
          </Form>
    </div>
 
    <Grid item>
      <div className="w-100 text-center mt-2">
      
      {t("Already have an account?")}    <Link to="/login" variant="body2">{t("Sign In")}</Link>
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