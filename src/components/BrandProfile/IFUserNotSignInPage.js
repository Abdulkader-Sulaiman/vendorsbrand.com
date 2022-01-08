import React from 'react'
import firebase, { db } from "../../firebase";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LanguageSelect from "../../languageSelect";
import HomeIcon from '@mui/icons-material/Home';
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const user = firebase.auth().currentUser;



function IFUserNotSignInPage() {
const [anchorElNav, setAnchorElNav] = React.useState(null);
const [anchorElUser, setAnchorElUser] = React.useState(null);
const user = firebase.auth().currentUser;
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


    if (user) {
  return(
      <div>
  
  <AppBar position="static" 
     style={{ background:'#fff'}}
    >
        
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
             noWrap
            component="div"
             sx={{ mr: 0, display: { xs: 'none', md: 'flex' } }}
            style={{color: 'rgb(25, 118, 210)', 
            position: 'relative',
            right:'20px'}}>
            {/* Vendorsbrand */}
          </Typography>
          <Link to="/login" onClick={() => auth.signOut()}>
                    <LogoutIcon fontSize="large" />
                </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{color: 'rgb(138, 141, 145)',
               marginLeft: '20px'}}
            >
              <MenuIcon />
          
            </IconButton>
       
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               
            <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
            <a href="/">Home</a>
           </Button>

        
          <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
            <a href="aboutVendorsbrand">about Vendorsbrand</a>
           </Button>
          
      
           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
          <a href="/AllMarkets">All Markets</a>
           </Button>
           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
          <a href="/food">food market</a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/RealEstate">real estate market</a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/cars">cars market</a>
           </Button>
          
            </Menu>
            
          </Box>
       

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 6, display: { xs: 'flex', md: 'none' } }}
          style={{color: 'rgb(25, 118, 210)'}}
          >
         VB
          </Typography>
      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          style={{marginLeft:'30px'}}
          >
         
          <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
            <a href="/"><HomeIcon style={{fontSize:'30px'}}/></a>
           </Button>

          <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
              
          <a href="/AllMarkets" style={{color:'rgb(138, 141, 145)'}}>All Markets</a>
           </Button>
           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
          <a href="/food" style={{color:'rgb(138, 141, 145)'}}>food market</a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/RealEstate" style={{color:'rgb(138, 141, 145)'}}>
            real estate market
         </a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/cars" style={{color:'rgb(138, 141, 145)'}}>cars market</a>
           </Button>
          </Box>
      
          <LanguageSelect />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                {/* <ArrowDropDownIcon /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        
      </Container>
    </AppBar>    

    <h3 style={{textAlign: 'center', position:'relative', top:'10px'}}>Store info</h3>
    <hr />
     <h5 style={{marginLeft: '20px'}}>{user.email}</h5>
      </div>
  )
    } else {
      // No user is signed in.
      return (
<div>
{/*"=========================================================" */}
    {/* 2 */}
<AppBar position="static" 
     style={{ background:'#fff'}}
    >



      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
             noWrap
            component="div"
             sx={{ mr: 0, display: { xs: 'none', md: 'flex' } }}
            style={{color: 'rgb(25, 118, 210)', 
            position: 'relative',
            right:'20px'}}>
            {/* Vendorsbrand */}
          </Typography>
       
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{color: 'rgb(138, 141, 145)'}}
            >
              <MenuIcon />
          
            </IconButton>
       
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

        <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
            <a href="/">Home</a>
           </Button>


          <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
            <a href="aboutVendorsbrand">about Vendorsbrand</a>
           </Button>
          
      
           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
          <a href="/AllMarkets">All Markets</a>
           </Button>
           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
          <a href="/food">food market</a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/RealEstate">real estate market</a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/cars">cars market</a>
           </Button>
            </Menu>
          </Box>
     
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 6, display: { xs: 'flex', md: 'none' } }}
          style={{color: 'rgb(25, 118, 210)'}}
          >
         VB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
          <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
            <a href="/"><HomeIcon style={{fontSize:'30px'}}/></a>
           </Button>

          <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
          <a href="/AllMarkets" style={{color:'rgb(138, 141, 145)'}}>All Markets</a>
           </Button>
           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
          <a href="/food" style={{color:'rgb(138, 141, 145)'}}>food market</a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/RealEstate" style={{color:'rgb(138, 141, 145)'}}>
            real estate market
         </a>
           </Button>

           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)', display: 'block'}}
           >
         <a href="/cars" style={{color:'rgb(138, 141, 145)'}}>cars market</a>
           </Button>
          </Box>
          <LanguageSelect />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                {/* <ArrowDropDownIcon /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>    
   {/* <h1> No user is signed in</h1> */}
   
   <h5
   style={{display: 'grid', placeItems: 'center',
   top:'50px',
   position:'relative',
   fontFamily:'sans-serif'
   }}
   
   >Create Vendor account and start selling today </h5>
 
   <div style={{display: 'grid', placeItems: 'center',
    top:'90px',
    position:'relative'
    }}>
  
   <Button
              variant="outlined"
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)'}}
           >
           <a href="login">Log In</a>
           </Button>
           <Button
             onClick={handleCloseNavMenu}
             sx={{ my: 2, color: 'rgb(138, 141, 145)'}}
             variant="outlined"
           >
          <a href="signup">Create an account</a>
           </Button>
  
           </div>
</div>
      )
   
    }
}   

export default IFUserNotSignInPage
