import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ComputerIcon from '@mui/icons-material/Computer';
import PowerSharpIcon from '@mui/icons-material/PowerSharp';
import BatteryChargingFullSharpIcon from '@mui/icons-material/BatteryChargingFullSharp';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import { MdRamenDining } from "react-icons/md";
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));
function ResponsiveDrawer() {
 
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  if(window.location.pathname == '/food') {
  
var Categories = ['All Food items', 'Pizza', 'Salat', 'Spaghetti']
 
    
// } else if(window.location.pathname == '/electronics') {
  
  var Categories = ['All Electronics  items', 
    'Phones',
   'Computers', 
   'Batteries',
    'Chargers'

]

}


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };




function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  if(window.location.pathname == '/food') {
  
    var drawer = (
        <div style={{position:'relative',bottom:'60px', marginLeft:'15px'}}>
        
          <List>
     
             <Button startIcon={<BorderAllIcon style={{fontSize:'30px'}}/>}>
            <h6 style={{marginLeft: '10px',
             marginTop: '10px'}}
             >
             All Food items
             </h6>
             </Button>
             <br />
       
            
             <Button startIcon={<RiceBowlIcon style={{fontSize:'30px'}}/>}>
            <h6 style={{marginLeft: '10px',
             marginTop: '10px'}}
             >
             Salat
             </h6>
             </Button>
    
             <Button startIcon={<MdRamenDining style={{fontSize:'30px'}}/>}>
            <h6 style={{marginLeft: '10px',
             marginTop: '10px'}}
             >
            Spaghetti
             </h6>
             </Button>
    
             <Button startIcon={<LocalPizzaIcon style={{fontSize:'30px'}}/>}>
            <h6 style={{marginLeft: '10px',
             marginTop: '10px'}}
             >
            Pizza
            <i class="fab fa-accusoft"></i>
             </h6>
             </Button>
             </List>
        </div>
      );
     
    }  
      


    if(window.location.pathname == '/electronics') {
  
        var drawer = (
            <div style={{position:'relative',bottom:'60px', marginLeft:'15px'}}>
            
              <List>
         
                 <Button startIcon={<BorderAllIcon style={{fontSize:'30px'}}/>}>
                <h6 style={{marginLeft: '10px',
                 marginTop: '10px'}}
                 >
                 All items
                 </h6>
                 </Button>
                 <br />
           
                
                 <Button startIcon={<PhoneAndroidIcon style={{fontSize:'30px'}}/>}>
                <h6 style={{marginLeft: '10px',
                 marginTop: '10px'}}
                 >
                 Phones
  
                 </h6>
                 </Button>
        
                 <Button startIcon={<ComputerIcon style={{fontSize:'30px'}}/>}>
                <h6 style={{marginLeft: '10px',
                 marginTop: '10px'}}
                 >
                Computers
  
                 </h6>
                 </Button>
        
                 <Button startIcon={<BatteryChargingFullSharpIcon style={{fontSize:'30px'}}/>}>
                <h6 style={{marginLeft: '10px',
                 marginTop: '10px'}}
                 >
                Batteries
    
                 </h6>
                 </Button>
                 <Button startIcon={<PowerSharpIcon style={{fontSize:'30px'}}/>}>
                <h6 style={{marginLeft: '10px',
                 marginTop: '10px'}}
                 >
                Chargers
                 </h6>
                 </Button>
                 
                 </List>
            </div>
          );
         
        }  

 
return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}
      style={{ background: '#fff', color:'rgb(138, 141, 145)' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{color:'#1976d2'}}>
            Vendorsbrand
          </Typography>
        </Toolbar>
      </AppBar>
    
      <nav className={classes.drawer}>
          
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    
    
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            // open={mobileOpen}
             open={open}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>

        </Hidden>
        
<Hidden xsDown implementation="css">
    
          <Drawer
            className={classes.drawer}
            // variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={open}
            >
            <IconButton onClick={handleDrawerClose} className={classes.closeMenuButton}>
              <CloseIcon />
            </IconButton>
            <br /><br />

            <h5 style={{marginLeft:'15px'}}>
                <a href={`/ProfilePage`}>
                    
         <Button startIcon={<PersonIcon  />}>
         account 
         </Button>
       
                </a>
        </h5>
<hr />
        <h5 style={{marginLeft:'15px'}}>
                <a href={`/`}>
                    
         <Button startIcon={<HomeIcon  />}>
          Home
         </Button>
       
                </a>
        </h5>
            <hr/>
            <div className={classes.toolbar} />
          
            {drawer}
            
          </Drawer>  
        </Hidden>
        
      </nav>
      
      <div className={classes.content}>
 
        <div className={classes.toolbar} />
        {/* <VisibleItemList /> */}
  
      </div>
    </div>
  );
}
 
export default ResponsiveDrawer;