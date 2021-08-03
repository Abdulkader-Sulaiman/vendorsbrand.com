import React, { useState, useEffect } from "react";
import { Menu, Grid } from "antd";
import firebase, { auth } from "../../firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomizedMenus from "./Dropdown_Menu";
import Avater from "../User_Avater";
import "../../css/LeftMenu.css";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../languageSelect";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { useBreakpoint } = Grid;

const LeftMenu = () => {
    // <BrowserRouter></BrowserRouter>
    const { md } = useBreakpoint();
    const { t } = useTranslation();
    //  let userId = firebase.auth().currentUser.uid;

    return (
        <Menu mode={md ? "horizontal" : "inline"}>
            <Avater />

            <Menu.Item>
                <CustomizedMenus />
            </Menu.Item>
            <hr />
            <Menu.Item>
                <LanguageSelect style={{ backgroundColor: "red" }} />
            </Menu.Item>

            <hr />

            <Menu.Item>
                <Link to="/login" onClick={() => auth.signOut()}>
                    <ExitToAppIcon fontSize="large" />
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default LeftMenu;
