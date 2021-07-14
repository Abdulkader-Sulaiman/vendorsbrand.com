import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { RocketOutlined } from "@ant-design/icons";
import UploadProduct from "../../Products/UploadProduct";
import Settings from "../BrandProfile/Settings";
import { DeleteOutlined } from '@ant-design/icons';
import firebase, { db, auth } from "../../firebase";
import { Redirect } from "react-router-dom";
// In this List User can Upload a Product or Post something
import { useTranslation } from "react-i18next";




const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));



const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.dark,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
      console.log("User is signed in")
    } else {
      // User is signed out
      // ...
      console.log("User is NOT signed in !");
    //   <Redirect to="/Login" />
    
    }
  });


function CustomizedMenus() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { t } = useTranslation();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>


            <div
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <RocketOutlined style={{position:'left', fontSize: "32px" }} />
            </div>


            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
            

    <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        {/* <PlusOutlined style={{fontSize:"25px"}} /> */}
                        <UploadProduct />
                    </ListItemIcon>
                    <ListItemText primary={t("Upload a product")} />
                </StyledMenuItem>
                


            
                {/* <StyledMenuItem>
                    <ListItemIcon onClick={handleClose}>
                        <PostAddIcon 
                            style={{
                                position: "relative",
                                fontSize: "33px",
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Post" />
                </StyledMenuItem> */}
                
                <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary={t("Store Profile")}/>
                </StyledMenuItem>
{/* 
                <StyledMenuItem onClick={handleClose}>
                    <DeleteOutlined style={{ fontSize: "32px" }}>
                        <Settings />
                    </DeleteOutlined>
                    <ListItemText primary=" Delete Products "  />
                </StyledMenuItem>
                */}

            </StyledMenu>
        
        </div>
    );
}

export default CustomizedMenus;
