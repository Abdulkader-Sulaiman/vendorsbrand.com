import React, { PropTypes } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    useParams,
} from "react-router-dom";

import { Switch } from "react-router";
import * as ROUTES from "./Routes/routes";
import Dashboard from "./components/header/Centered_Tabs";
import { AuthProvider } from "../src/contexts/AuthContext";
import ProfilePage from "./components/BrandProfile/Brandprofile__Page.js";
import { Suspense } from "react";
import NotFound from "./components/pages/NotFound";
import SignUp from "./Auth/SignUp";
import logIn from "./Auth/SignIn";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1890ff",
        },
    },
});

function App() {
    const { t } = useTranslation();
    return (
        <div>
            <usePlacesAPI />
            <Router>
                <div className="app">
                    <div className="language-select">
                        {/* <LanguageSelect /> */}

                        <AuthProvider>
                            <Suspense>
                                <Switch>
                                    <Route
                                        exact
                                        path={ROUTES.Dashboard}
                                        component={Dashboard}
                                    />
                                    <Route
                                        exact
                                        path={ROUTES.LOGIN}
                                        component={logIn}
                                    />
                                    <Route
                                        exact
                                        path={ROUTES.SignUp}
                                        component={SignUp}
                                    />
                                    {/*  */}

                                    <Route
                                        exact
                                        path={ROUTES.Profile}
                                        component={ProfilePage}
                                    />
                                    {/* <Route path={ROUTES.NOT__FOUND} component={NotFound} /> */}
                                </Switch>
                            </Suspense>
                        </AuthProvider>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
