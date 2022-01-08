import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Sidebar from '../header/Sidebar';
import "../../css/Styles.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from '../pages/Home'
// import  TestContext1  from "../../contexts/profilesDataContext"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    useHistory
  } from "react-router-dom";


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
  
// import '../../css/AppLayout.css'
const drawerWidth = 240


const useStyles = makeStyles({

// page: {
//  backgroundColor:'#f9f9f9',
//  width:'100%'
// },
//     drawer: {
//      width: drawerWidth,
//     },
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     root: {
//         display: 'flex',
//         // backgroundColor: 'red',
//         color:'red'
        
//     },

drawerPaper: {
    zIndex: 0,
    paddingTop: 60,
    width: drawerWidth,
  },
    
       drawerPaper: {
           width: drawerWidth,
       },
       root: {
           display: 'flex',
           position: 'relative',
            top:'150px',
       }
})


function AppLayout({ children}) {
    const [value, setValue] = React.useState(0);
    let history = useHistory();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const classes = useStyles()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

//       var item = document.location.pathname;
// var URLID = item.split("/").pop();
// console.log(URLID); // get the last item

const HomePath = document.location.pathname;
// myarr[2]

      {/* app bar */}

        {/* side bar/drawer */}
        const container =
        window !== undefined ? () => window().document.body : undefined;
        //   Show the Sidebar only in Home Page
        if( document.location.pathname.split('/')[1] !== "shops" 
        // || document.location.pathname.split('/')[1] !== "shops"
            
        ) {
           
        return (<div className={classes.root}>
             {/* <TestContext1> */}

                <Sidebar /> 
       { console.log("HomePath",HomePath)}
              
 
              {/* </TestContext1> */}
            <div className={classes.page}>
            {children}
            </div>
          </div>
    
    
        )
        }else {
            console.log("MMM", HomePath)
        return (
   
        //  <div className={classes.root}>
    <>
            
        
            <div className={classes.page}>
            {children}
 
     
            </div>
         {/* </div> */}
    </>
    
        )
        }
  
    
}

export default AppLayout
