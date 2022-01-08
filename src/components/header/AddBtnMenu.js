import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import {IconButton} from '@mui/material';
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddIcon from '@mui/icons-material/Add';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import UploadProduct from '../../Products/UploadProduct'
 
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      style={{marginRight:'40px'}}
      >
       
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            style={{marginLeft:'-4px'}}
          >
            <AddBoxOutlinedIcon />
          </IconButton>
       
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
        <a href="/upload">
        <AddRoundedIcon style={{marginRight:'15px', color: 'rgb(25, 118, 210)'}}/> 
        Add new Product
        </a>
        
        {/* <UploadModal /> */}
        
        </MenuItem>
      
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Homes for Sale or Rent
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TimeToLeaveIcon fontSize="small" />
          </ListItemIcon>
          Vehicles
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PhoneIphoneIcon fontSize="small" />
          </ListItemIcon>
          Electronics
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <RestaurantIcon fontSize="small" />
          </ListItemIcon>
            Food
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CheckroomIcon fontSize="small" />
          </ListItemIcon>
          Clothing
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PhoneIphoneIcon fontSize="small" />
          </ListItemIcon>
          Electronics
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
