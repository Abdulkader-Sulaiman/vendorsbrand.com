import React from "react";
import ReactDOM from "react-dom";
import "@firebase/firestore";
import App from "./App";
import "./i18n.js";
import  CurrentUserData from "./contexts/CurrentUserData"
ReactDOM.render(
    <React.StrictMode>
     <CurrentUserData>
        <App />
        </CurrentUserData>
        </React.StrictMode>,
    document.getElementById("root")
);
