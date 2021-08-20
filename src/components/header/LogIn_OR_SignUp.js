import React, { useState, useEffect } from "react";
import { Menu, Grid } from "antd";
import { auth } from "../../firebase";
import firebase, { db } from "../../firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomizedMenus from "./Dropdown_Menu";
import Avater from "../User_Avater";
import "../../css/LeftMenu.css";
import "../../css/LogIn_OR_SignUp.css";
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
        <Menu mode={md ? "horizontal" : "inline"} className="Manu_Container">
            <Avater />

            <Menu.Item className="SignUp">
                <h5 style={{position: "relative", left: "5px"}}>
                    <Link to="SignUp" id="SignUp">
                        {t("Sign Up")}
                    </Link>
                </h5>
            </Menu.Item>
            <hr />
            <Menu.Item className="">
                <h5>
                    <Link id="LogIn" to="/login">
                        {t("Log In")}
                    </Link>
                </h5>
            </Menu.Item>
            {/*  
            <LanguageSelect /> */}

            <hr />

            <Menu.Item className="">
                <LanguageSelect />
            </Menu.Item>

            <hr />
        </Menu>
    );
};

export default LeftMenu;
