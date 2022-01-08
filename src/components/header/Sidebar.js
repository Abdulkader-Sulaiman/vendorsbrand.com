import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import firebase, { db } from "../../firebase";
import AddBtnMenu from '../header/AddBtnMenu'
const drawerWidth = 240;
const user = firebase.auth().currentUser;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const HomePath = document.location.pathname;
  const [user, setUser] =  React.useState();

//change the Width to 45rem if the left Menu is opend
if(open == true) {
    document.body.style = 'background: #EAEDED;width:45rem'
}else {
    document.body.style = 'left: 0px;background: #EAEDED;'
}
// checked if user login or not 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      setUser(true)
    } else {
      // No user is signed in.
      setUser(false)
    }
  });

console.log('USER State',  user)
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
 
  if(document.location.pathname == "/" ) {
    return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}
     style={{ background: '#fff', color:'rgb(138, 141, 145)' }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" })
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div"
              style={{color:'#1976d2'}}
              >
              Vendorsbrand
              </Typography>
            </Toolbar>
          </AppBar>
      
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
    

            {/* <List> 
              {["Add Products"].map((text, index) => (
                  <a href="">
                <ListItem button key={text}>
                  <ListItemIcon>
                   <AddBoxOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                  </a>
              ))}
            </List> */}

{user == true &&
        <h2>
            <List> 
              {["Add Products"].map((text, index) => (
                
                <ListItem button key={text}>
                  <ListItemIcon>
                   {/* <AddBoxOutlinedIcon/>
                   <UploadProduct /> */}
                   <AddBtnMenu />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
        </h2>
      }

{user  == false &&
        <h2>
             <List> 
              {["Add Products"].map((text, index) => (
                  <a href="/ProfilePage">
                <ListItem button key={text}>
                  <ListItemIcon>
                   <AddBoxOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                  </a>
              ))}
            </List>
        </h2>
      }
            {/* <hr /> */}
<div style={{position: 'relative', bottom:'25px'}}>
<List> 
              {["account"].map((text, index) => (
                  <a href="ProfilePage">
                <ListItem button key={text}>
                  <ListItemIcon >
                <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                  </a>
              ))}
            </List>
            <hr />

            <List> 
              {["All"].map((text, index) => (
                  <a href="AllMarkets">
                <ListItem button key={text}>
                  <ListItemIcon>
                <AppsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                  </a>
               
              ))}
            </List>
            <List>
              {["Food"].map((text, index) => (
                  <a href="food">
                <ListItem button key={text} style={{position: "relative", bottom: "15px"}}>
                  <ListItemIcon>
                  <RestaurantOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                </a>
              ))}
            </List>
   
            <List>
              {["Real Estate"].map((text, index) => (
                  <a href="RealEstate">
                <ListItem button key={text} style={{position: "relative", bottom: "15px"}}>
                  <ListItemIcon>
                  <CottageOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                </a>
              ))}
            </List>
    
    
            <List>
              {["Cars"].map((text, index) => (
                  <a href="cars">
                <ListItem button key={text} style={{position: "relative", bottom: "15px"}}>
                  <ListItemIcon>
                  <DirectionsCarOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                </a>
              ))}
            </List>
    
    
            <List>
              {["Electronics"].map((text, index) => (
                  <a href="electronics">
                <ListItem button key={text} style={{position: "relative", bottom: "15px"}}>
                  <ListItemIcon>
                  <PhoneIphoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                </a>
              ))}
            </List>

            
            <List>
              {["Clothes"].map((text, index) => (
              <a href="/clothes">
              <ListItem button key={text} style={{position: "relative", bottom: "15px"}}>
                  <ListItemIcon>
                  <CheckroomOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                </a>
              ))}
            </List>
            </div>
            {/* <Divider /> */}
            {/* <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            
          </Box>
        </Box>
      );
}




else {
    return null
}

}
