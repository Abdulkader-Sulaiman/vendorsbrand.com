import React, {useEffect, useContext , useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
import firebase, { db } from "./firebase";
import { Switch } from "react-router";
import * as ROUTES from "./Routes/routes";
import Dashboard from "./components/pages/Home";
import { AuthProvider } from "../src/contexts/AuthContext";
 import TestContext1 from "./contexts/ProfilesDataContext"
import ProfilePage from "./components/BrandProfile/Brandprofile__Page.js";
import { Suspense } from "react";
import NotFound from "./components/pages/NotFound";
import SignUp from "./Auth/SignUp";
import logIn from "./Auth/SignIn";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import FirestoreContext from "./contexts/FirestoreContext";
import SearchPage from './components/header/SearchPage'
import AppLayout from './components/header/AppLayout'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Media from './components/Posts/Post';
import TestPage from './components/pages/TestPage';
import AllMarkets from './components/pages/AllMarkets';
import Post from './components/Posts/Post';
import Home from './components/pages/Home'
import CarsPage from './components/pages/CarsPage'
import ClothesPage from './components/pages/ClothesPage'
import FoodPage from './components/pages/Food/FoodPage'
import RealEstatePage from './components/pages/RealEstatePage'
import ProductPage from "./Products/ProductPageContent";
import IFUserNotSignInPage from "./components/BrandProfile/IFUserNotSignInPage"
import ElectronicsPage from './components/pages/Electronics/ElectronicsPage';
import UploadPage from './Products/UploadPage'
// import history from '../src/history';
// Get PageName 
// Get ProfileID

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1890ff",
        },
    },
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


function App() {
    const [currentPost, setCurrentPost] = useState({});
    const [loading, setLoading] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
{/* <h1>{currentPost.pageName}</h1> */}

var item = document.location.pathname;
var ProfileID = item.split("/").pop();
console.log(ProfileID); // get the last item


useEffect(() => {
    const fetchData = () => {
        try {
        db.collection("SignUp-data").where("profileUID", "==", ProfileID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let data = { title: 'not found' };
               
                if (doc.exists) {
                    data = doc.data();
                }
                setCurrentPost(data);
                setLoading(false);

            });
        })
                
                // .doc('1p4PBe8nOHJ4zSOw3ZfH')
                // .get();
   
        } catch(err) {
            console.error(err);
        }
    };

    fetchData();
}, []);


    useEffect(() => {
    const urlPath = document.location.pathname;
    
    })

    const { t } = useTranslation();

    return (
     
        <div>
     
            <usePlacesAPI />
           
            <Router>
                <div className="app">
                    <div className="language-select">
                    <AuthProvider>

                    <Route
                                    exact
                                    path='/upload'
                                    component={UploadPage}
                                    />

                        {/* <LanguageSelect /> */}
                        <BrowserRouter> 
                                <Switch>
                                  <Route
                                       exact={true}
                                        path={ROUTES.LOGIN}
                                        component={logIn}
                                    />
                                    <Route
                                       exact={true}
                                        path={ROUTES.SignUp}
                                        component={SignUp}
                                    />

                    <TestContext1>
                            <Suspense>

                      

                      
                            <AppLayout>

                            <Route
                                    exact
                                    path='/'
                                    component={Home}
                                    />
         
                                <Route
                                    exact
                                    path='/media'
                                    component={Media}
                                    />
                                  <Route
                                    exact
                                    path='/AllMarkets'
                                    component={AllMarkets}
                                    />

                                <Route
                                    exact
                                    path='/Cars'
                                    component={CarsPage}
                                    />

<Route
                                    exact
                                    path='/electronics'
                                    component={ElectronicsPage}
                                    />




                                <Route
                                    exact
                                    path='/clothes'
                                    component={ClothesPage}
                                    />

                                <Route
                                    exact
                                    path='/food'
                                    component={FoodPage}
                                    />

                                <Route
                                    exact
                                    path='/RealEstate'
                                    component={RealEstatePage}
                                    />




{/* <Route
                                        exact
                                        path="/"
                                        component={Dashboard}
                                    /> */}
                                   
                        

                                    {/*  */}

                                    <Route
                                       exact={true}
                                        path={'/SearchPage'}
                                        component={SearchPage}
                                    />

                                    {/* <Route path={ROUTES.NOT__FOUND} component={NotFound} /> */}
                             
                                
                                </AppLayout>
                            {/* outside the App Layout */}
                                <Route
                                       exact={true}
                                        path={`/shops/${currentPost.PageName}/:uid`}
                                        component={ProfilePage}
                                    />
                                      <Route
                                       exact={true}
                                        path={`/AllMarkets/ProductPage/:uid`}
                                        component={ProductPage}
                                    />


                                          <Route
                                       exact={true}
                                        path={`/ProfilePage`}
                                        component={IFUserNotSignInPage}
                                    />
                    
                            </Suspense>
                            </TestContext1>
                    
                        </Switch>
                    </BrowserRouter>
                    </AuthProvider>
                    </div>
                </div>
            </Router>
        
        </div>
    );
}
// change the background color of the body
document.body.style = 'background: #EAEDED;';
export default App;
