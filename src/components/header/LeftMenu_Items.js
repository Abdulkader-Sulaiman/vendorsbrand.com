import React, { useState, useEffect } from 'react';
import { Menu, Grid } from "antd";
import firebase, { auth } from "../../firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomizedMenus from "./Dropdown_Menu";
import Avater from '../User_Avater';
import "../../css/LeftMenu.css";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { useBreakpoint } = Grid;

const LeftMenu = () => {
    // <BrowserRouter></BrowserRouter>
    const { md } = useBreakpoint();
   
    //  let userId = firebase.auth().currentUser.uid;

    return (

        <Menu mode={md ? "horizontal" : "inline"}>
            <Avater />
            <hr />
            <Menu.Item>
                <CustomizedMenus style={{ fontSize: "30px"}} />
            </Menu.Item>
            <hr />
            <Menu.Item>
                <Link to="/login" onClick={() => auth.signOut()}>
                <ExitToAppIcon fontSize="large" />
                </Link>  
            </Menu.Item>
            <hr />
        </Menu>
    );
};

export default LeftMenu;
